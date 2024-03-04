#!/bin/sh

set -e
set -o pipefail

if [ $# -eq 0 ]; then
  echo "Usage: $0 <package.json app name>"
  exit 1
fi

APP_NAME=$1
CURRENT_HASH=$(turbo run build --dry=json --filter $APP_NAME | jq ".tasks[] | select(.taskId == \"$APP_NAME#build\").hash" -r)
PREVIOUS_HASH=$(aws s3 cp "s3://turbo-hashes/$APP_NAME-hash.txt" -)

pre_build() {
  echo "Starting pre-build steps for $APP_NAME..."
  
  if [ "$CURRENT_HASH" = "$PREVIOUS_HASH" ]; then
    echo "Hash matches for $APP_NAME, skip deploy"
    CODEPIPELINE_PIPELINE_NAME="${APP_NAME}-pipeline"

    aws codepipeline list-pipeline-executions \
      --pipeline-name "$CODEPIPELINE_PIPELINE_NAME" | \
    jq -r '.pipelineExecutionSummaries[] | select(.status == "InProgress") | .pipelineExecutionId' | \
    xargs -I {} aws codepipeline stop-pipeline-execution \
      --pipeline-name "$CODEPIPELINE_PIPELINE_NAME" \
      --pipeline-execution-id {} \
      --abandon \
      --reason "Cache hit for $APP_NAME, aborting build"
  else
    echo "Cache miss for $APP_NAME, proceeding with build"
    build
  fi
}

build() {
  REPOSITORY_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$APP_NAME"
  echo "Building $APP_NAME..."
  echo Logging in to Docker Hub...
  docker login -u "$DOCKERHUB_USERNAME" -p "$DOCKERHUB_PASSWORD"
  echo Building the Docker image...
 docker build \
  --build-arg DB_USER="${DB_USER}" \
  --build-arg ENV="${ENV}" \
  --build-arg KAFKA_BROKER_BASE_URL="${KAFKA_BROKER_BASE_URL}" \
  --build-arg KAFKA_USERNAME="${KAFKA_USERNAME}" \
  --build-arg KAFKA_PASSWORD="${KAFKA_PASSWORD}" \
  --build-arg KAFKA_TOPIC="${KAFKA_TOPIC}" \
  --build-arg KAFKA_CLIENT_ID="${KAFKA_CLIENT_ID}" \
  --build-arg KAFKA_GROUP_ID="${KAFKA_GROUP_ID}" \
  --build-arg DB_NAME="${DB_NAME}" \
  --build-arg DB_URI="${DB_URI}" \
  --build-arg DB_PASSWORD="${DB_PASSWORD}" \
  --build-arg REDIS_BASE_URL="${REDIS_BASE_URL}" \
  --build-arg DB_SSL_MODE="${DB_SSL_MODE}" \
  --build-arg WEBSOCKET_SERVER="${WEBSOCKET_SERVER}" \
  -t "$REPOSITORY_URI:latest" \
  -f "./apps/$APP_NAME/Dockerfile.production" .

  echo Logging in to Amazon ECR...
  aws ecr get-login-password --region "$AWS_DEFAULT_REGION" | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com"
  echo Pushing the Docker image...
  docker push "$REPOSITORY_URI:latest"
  echo Writing image definitions file...
  printf '[{"name":"%s","imageUri":"%s"}]' "$APP_NAME" "$REPOSITORY_URI:latest" > imagedefinitions.json

  post_build
}

post_build() {
  echo "Post-build steps for $APP_NAME..."
  echo "$CURRENT_HASH" > "$APP_NAME-build-hash.txt"
  aws s3 cp "$APP_NAME-build-hash.txt" "s3://turbo-hashes/$APP_NAME-hash.txt"
  echo "Post-build steps completed."
}

pre_build
