# custom build image for aws CodeBuild
FROM node:20-alpine

RUN apk add --no-cache jq aws-cli docker
RUN npm install turbo@1.12.3 -g

WORKDIR /app