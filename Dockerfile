FROM rust:1.85.0

RUN useradd -m rust
USER rust

RUN cargo install cargo-watch
RUN cargo install diesel_cli --no-default-features --features postgres

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release

COPY . .

EXPOSE 8080

CMD ["cargo", "watch", "-x", "run"]
