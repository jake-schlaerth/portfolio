# custom build image for aws CodeBuild
FROM node:20-alpine

RUN apk add --no-cache jq aws-cli docker-cli
RUN npm install turbo -g

WORKDIR /app