# Repository Vulgarity Analysis Backend

NestJS API for analyzing GitHub repositories to detect profanity and inappropriate language in commit messages. Includes both REST API endpoints and CLI tools for batch processing.

Built with Node.js, NestJS, Prisma ORM, and PostgreSQL.

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgres://user:password@repo-vulgarity-analysis-database:5433/analysis_db
NODE_ENV=development
PORT=8081
```
