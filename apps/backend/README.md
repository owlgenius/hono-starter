# Backend

Hono JSON API backend for the SvelteKit dashboard frontend.

The todos feature is the reference implementation for backend feature structure, OpenAPI route definitions, Zod validation, Drizzle database access, service/query boundaries, and typed frontend API access.

## Development

From the repository root:

```sh
npm run dev:backend
```

The backend defaults to:

```txt
http://localhost:3001
```

API routes are mounted under:

```txt
http://localhost:3001/api
```

Run the frontend separately when working across the full app:

```sh
npm run dev:frontend
```

## Environment

Environment variables are validated in `env.ts`.

Common local values:

```txt
PORT=3001
DB_FILE_NAME=file:local.db
CORS_ORIGINS=http://localhost:5173
LOG_LEVEL=debug
NODE_ENV=development
```

`CORS_ORIGINS` accepts a comma-separated list when multiple frontend origins are needed.

## OpenAPI Docs

With the backend running:

```txt
http://localhost:3001/doc     OpenAPI JSON
http://localhost:3001/ui      Swagger UI
http://localhost:3001/scalar  Scalar API reference
```

## Database Migrations

After changing `src/db/schema.ts`, run these commands from `apps/backend`:

```sh
npx drizzle-kit generate
npx drizzle-kit migrate
```

Generated migrations are written to `drizzle/`.

## Build

```sh
npm run build -w @hono-starter/backend
```

## Feature Workflow

Read the backend feature guide before creating new API features:

```txt
docs/feature-workflow.md
```

The guide documents the current conventions for:

- feature folder structure
- OpenAPI route definitions
- Zod and Drizzle-derived schemas
- handlers, services, and queries
- success and error response envelopes
- authentication middleware
- database migration workflow
- frontend typed API contract
