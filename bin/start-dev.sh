#!/bin/bash

# Check if npm is installed on the host system
if ! command -v npm &> /dev/null; then
  echo "Error: npm is not installed on your system."
  echo "Please install npm to proceed."
  exit 1
fi

# Check if Docker is installed on the host system
if ! command -v docker &> /dev/null; then
  echo "Error: Docker is not installed on your system."
  echo "Please install Docker to proceed."
  exit 1
fi

if ! docker info &> /dev/null; then
  echo "Docker daemon is not running. Starting Docker..."

  open -a Docker > /dev/null 2>&1 &

  max_attempts=5
  attempts=0
  while [ $attempts -lt $max_attempts ]; do
    if docker info &> /dev/null; then
      echo "Docker daemon is now running."
      break
    fi

    attempts=$((attempts+1))
    sleep 1
  done

  if [ $attempts -eq $max_attempts ]; then
    echo "Failed to start Docker daemon after $max_attempts attempts. Please start Docker manually and rerun the script."
    exit 1
  fi
fi

# Start the Caddy reverse proxy service
docker compose up
