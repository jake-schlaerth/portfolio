#!/bin/bash

declare -A APP_SECRETS=(
    ["analytics-streamer"]="dev/analytics-streamer"
    ["analytics-writer"]="dev/analytics-writer"
    ["frontend"]="dev/frontend"
)

for app in "${!APP_SECRETS[@]}"; do
    secret="${APP_SECRETS[$app]}"
    path="./apps/$app/.env"

    ./bin/build-env/build-env.sh "$secret" "$path"

    if [ $? -eq 0 ]; then
        echo "Successfully generated .env for $app at $path"
    else
        echo "Failed to generate .env for $app"
    fi
done
