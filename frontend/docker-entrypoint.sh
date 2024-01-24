#!/bin/sh

if [ "$ENV" = "prod" ]; then
  npm run build && npm run start
else
  npm run dev
fi
