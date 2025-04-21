FROM rust:1.72-slim-bullseye

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gcc \
    pkg-config \
    inotify-tools \
    && rm -rf /var/lib/apt/lists/*

# Install wasm-pack
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml ./

# Create src directory with a dummy lib.rs to build dependencies
RUN mkdir -p src && \
    echo "fn main() {}" > src/lib.rs && \
    cargo fetch

# Now copy the real source code
COPY src/ src/
COPY build.sh ./

# Make the build script executable
RUN chmod +x build.sh

# Command to run the build script which watches for changes
CMD ["./build.sh"] 