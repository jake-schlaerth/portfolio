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

# Check if Docker daemon is running, and start it if not
if ! docker info &> /dev/null; then
  echo "Docker daemon is not running. Starting Docker..."
  open -a Docker # This command opens Docker for Mac
  sleep 5 # Wait for Docker to start (you can adjust the duration)
  if ! docker info &> /dev/null; then
    echo "Failed to start Docker daemon. Please start Docker manually and rerun the script."
    exit 1
  fi
fi

# Run npm install in the frontend directory on the host system
cd frontend # Change to the frontend directory where package.json is located
npm install

# Navigate back to the project's root directory
cd ..

# Start the development environment using Docker Compose
docker-compose -f docker-compose.yml up frontend-dev
