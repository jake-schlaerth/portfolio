#!/bin/sh

if [ "$ENV" = "prod" ]; then
  echo "prod"
  npm run build && npm run start
else
  echo "dev"
  npm run dev
fi
