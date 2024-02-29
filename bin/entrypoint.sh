#!/bin/bash

SECRET_NAME="${SECRET_NAME}"
ENV_FILE_PATH=".env"

if [ -z "$SECRET_NAME" ]; then
    echo "Environment variable SECRET_NAME must be set."
    exit 1
fi

./bin/build-env/build-env.sh "$SECRET_NAME" "$ENV_FILE_PATH"

node $1