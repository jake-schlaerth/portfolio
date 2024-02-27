#!/bin/sh

if [ $# -eq 0 ]; then
  echo "Usage: $0 <package.json app name>"
  exit 1
fi

APP_NAME=$1

CURRENT_HASH=$(turbo run build --dry=json --filter $APP_NAME | jq ".tasks[] | select(.taskId == \"$APP_NAME#build\").hash" -r)

PREVIOUS_HASH=$(aws s3 cp s3://turbo-hashes/$APP_NAME-hash.txt - || echo "")

if [ "$CURRENT_HASH" = "$PREVIOUS_HASH" ]; then
  echo "Hash matches for $APP_NAME, skip deploy"
  CODEPIPELINE_PIPELINE_NAME="${APP_NAME}-pipeline"

  aws codepipeline list-pipeline-executions \
    --pipeline-name $CODEPIPELINE_PIPELINE_NAME | \
  jq -r '.pipelineExecutionSummaries[] | select(.status == "InProgress") | .pipelineExecutionId' | \
  xargs -I {} aws codepipeline stop-pipeline-execution \
    --pipeline-name $CODEPIPELINE_PIPELINE_NAME \
    --pipeline-execution-id {} \
    --abandon \
    --reason "cache hit for $APP_NAME, aborting build"

else
  echo "cache miss for $APP_NAME, proceeding with build"

  # todo: build
  
  echo $CURRENT_HASH > $APP_NAME-build-hash.txt
  aws s3 cp $APP_NAME-build-hash.txt s3://turbo-hashes/$APP_NAME-hash.txt
fi