# Frontend

SvelteKit dashboard frontend for the Hono starter backend.

The todos feature is the reference implementation for frontend feature structure, typed API access, TanStack Query server state, Zod/Superforms forms, and shadcn-svelte UI components.

## Development

From the repository root:

```sh
npm run dev:frontend
```

The frontend expects the backend API URL from `.env`:

```txt
PUBLIC_API_URL=http://localhost:3001/api
```

Run the backend separately when working with API-backed pages:

```sh
npm run dev:backend
```

## Checks

```sh
npm run check -w @hono-starter/frontend
```

## Build

```sh
npm run build -w @hono-starter/frontend
```

The current project uses `@sveltejs/adapter-auto`. Configure a specific SvelteKit adapter before deploying to a known production platform.

## Feature Workflow

Read the frontend feature guide before creating new dashboard/admin features:

```txt
docs/feature-workflow.md
```

The guide documents the current conventions for:

- feature folder structure
- typed Hono client usage
- TanStack Query queries and mutations
- Zod and Superforms forms
- shadcn-svelte form components
- API error handling
- route responsibilities
