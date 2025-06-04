# Personal Projects Monorepo

A collection of personal projects built with modern web technologies, including a collaborative whiteboard, repository analysis tools, and visual effects rendering.

## Applications

**Frontend** - React application serving as the main interface for all projects

**Whiteboard Backend** - Real-time collaborative whiteboard API built with Rust and WebSockets

**VFX Renderer** - WebAssembly-based visual effects library compiled from Rust

**Repository Vulgarity Analysis** - NestJS API for analyzing GitHub repositories for profanity

## Running the Project

Development:

```bash
docker compose up
```

Production:

```bash
docker compose -f compose.prod.yml up -d
```

The frontend will be available at http://localhost:5173 in development mode.

## Environment Configuration

Create a `.env` file in the root directory with your database credentials and service configuration.
