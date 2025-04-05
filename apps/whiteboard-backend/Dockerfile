FROM rust:1.85.0

WORKDIR /app

RUN useradd -m rust

RUN cargo install cargo-watch
RUN cargo install diesel_cli --no-default-features --features postgres

COPY Cargo.toml Cargo.lock ./

RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
 
COPY . .

EXPOSE 8080

USER rust

CMD ["sh", "-c", "diesel migration run && cargo watch -x run"]
