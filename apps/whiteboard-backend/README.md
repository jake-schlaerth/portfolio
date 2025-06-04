# Whiteboard Backend

Real-time collaborative whiteboard API built with Rust and Axum. Supports multiple concurrent users drawing on shared canvases with WebSocket communication and PostgreSQL persistence.

Built with Rust, Axum, Diesel ORM, and Tokio for async operations.

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgres://user:password@database:5432/whiteboard_db
RUST_LOG=info
```
