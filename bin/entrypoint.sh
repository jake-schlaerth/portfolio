#!/bin/bash

SECRET_NAME="$SECRET_NAME"
ENV_FILE_PATH="$ENV_FILE_PATH"

if [ -z "$SECRET_NAME" ]; then
    echo "Environment variables SECRET_NAME and ENV_FILE_PATH must be set."
    exit 1
fi

./bin/build-env/build-env.sh "$SECRET_NAME" "$ENV_FILE_PATH"

node $1