#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <secret-name> <env-file-path>"
    exit 1
fi

SECRET_NAME="$1"

ENV_FILE_PATH="$2"

SECRET_VALUES=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME --query SecretString --output text)

if [ $? -eq 0 ]; then
    echo $SECRET_VALUES | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" > "$ENV_FILE_PATH"
    echo "Generated .env file at $ENV_FILE_PATH for secret $SECRET_NAME"
else
    echo "Failed to retrieve secret."
fi
