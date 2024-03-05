#!/bin/bash

ENV_PREFIX="${ENV_PREFIX:-dev}"

app_directories=$(find ./apps -maxdepth 1 -mindepth 1 -type d -exec basename {} \;)

for app in $app_directories; do
    secret="${ENV_PREFIX}/${app}"
    path="./apps/$app/.env"

    ./bin/build-env/build-env.sh "$secret" "$path"

    if [ $? -eq 0 ]; then
        echo "Successfully generated .env for $app at $path"
    else
        echo "Failed to generate .env for $app"
    fi
done
