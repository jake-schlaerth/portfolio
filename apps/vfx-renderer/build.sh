#!/bin/bash

# Install wasm-pack if not installed
if ! command -v wasm-pack &> /dev/null; then
    echo "Installing wasm-pack..."
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
fi

# Function to build the wasm package
build_wasm() {
    echo "Building wasm package..."
    wasm-pack build --target web --out-dir ./pkg
    echo "Build completed!"
}

# Initial build
build_wasm

# Watch for changes and rebuild
echo "Watching for changes in src directory..."
while true; do
    inotifywait -r -e modify,create,delete ./src
    build_wasm
done 