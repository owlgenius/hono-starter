# Backend Feature Workflow

This guide documents the conventions used by the todos API feature. New backend features should follow this structure unless there is a clear reason to choose a different pattern.

## Goals

- Keep HTTP route definitions, request handlers, business logic, and database queries in separate files.
- Derive API schemas from Drizzle tables where possible.
- Keep OpenAPI documentation close to each route.
- Return consistent success and error response envelopes.
- Keep database access behind query functions.
- Export route types so the frontend can use the typed Hono client.

## Current Example

The todos feature lives here:

```txt
src/api/todos/
  handlers/
    createTodo.handler.ts
    getTodos.handler.ts
    updateTodo.handler.ts
  queries/
    createTodo.query.ts
    getTodosByUserId.query.ts
    updateTodo.query.ts
  routes/
    createTodo.route.ts
    getTodos.route.ts
    index.ts
    updateTodo.route.ts
  schemas/
    todos.schema.ts
  services/
    createTodo.service.ts
    getTodos.service.ts
    updateTodo.service.ts
```

The backend owns the database schema, API validation, OpenAPI contract, and persisted data behavior. The frontend consumes the exported API type through `@hono-starter/backend/api`.

## Folder Responsibilities

Use this structure for new features:

```txt
src/api/<feature>/
  schemas/       Zod/OpenAPI schemas and exported request/response types
  routes/        createRoute definitions and feature route registration
  handlers/      Hono handlers for HTTP concerns
  services/      business logic and domain errors
  queries/       Drizzle database reads and writes
  middleware/    optional feature-specific middleware
```

Keep cross-feature helpers under `src/api/common/`, `src/utils/`, or another shared location only when they are genuinely reused.

## Application Boundary

The app is assembled in three layers:

```txt
src/index.ts     starts the server and initializes the database
src/app.ts       configures the Hono app, middleware, OpenAPI, and errors
src/routes.ts    registers API route groups under /api
```

`src/app.ts` mounts all API routes under `/api`:

```ts
const appWithRoutes = app.route("/api", routes);
```

Do not mount feature routes directly in `src/app.ts`. Add feature route groups to `src/routes.ts` instead.

## Route Registration

Each feature should expose a route group from `routes/index.ts`:

```ts
const app = createAppRouter();

app.use("*", authMiddleware);

const todosRoutes = app
  .openapi(getTodosRoute, getTodosHandler)
  .openapi(createTodoRoute, createTodoHandler)
  .openapi(updateTodoRoute, updateTodoHandler);

export default todosRoutes;
```

Register the route group in `src/routes.ts`:

```ts
const routes = createAppRouter()
  .openapi(healthRoute, (c) => {
    return c.json(
      {
        success: true,
        status: "ok",
      },
      OK,
    );
  })
  .route("/todos", todosRoutes);
```

The exported `ApiRoutes` type in `src/routes.ts` is the frontend contract:

```ts
export type ApiRoutes = typeof routes;
```

Changes to route paths, methods, status codes, request schemas, or response schemas affect frontend inferred types.

## OpenAPI Routes

Define each endpoint with `createRoute` in its own `*.route.ts` file.

Responsibilities:

- Set the HTTP method and path.
- Add tags and a concise summary.
- Add `security: [{ Bearer: [] }]` for authenticated endpoints.
- Declare request params, query, and body schemas.
- Declare all expected success and error responses.

Example:

```ts
export const createTodoRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Todos"],
  security: [{ Bearer: [] }],
  summary: "Create a todo",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateTodoBodySchema,
        },
      },
    },
  },
  responses: {
    [CREATED]: {
      description: "Todo created successfully",
      content: {
        "application/json": {
          schema: TodoResponseSchema,
        },
      },
    },
    [BAD_REQUEST]: badRequestErrorResponse,
    [UNAUTHORIZED]: unauthorizedResponse,
    [UNPROCESSABLE_ENTITY]: validationErrorResponse,
    [INTERNAL_SERVER_ERROR]: internalServerErrorResponse,
  },
});
```

Use status constants from `src/utils/http-status-codes.ts` instead of numeric literals.

## Schemas

Feature API schemas live in `schemas/<feature>.schema.ts`.

For database-backed resources, derive schemas from Drizzle tables:

```ts
export const TodoSchema = createSelectSchema(todosTable, {
  id: positiveId,
  title: todoTitleOutput,
  completed: todoCompletedOutput,
}).openapi("Todo");

export const CreateTodoBodySchema = createInsertSchema(todosTable, {
  title: todoTitleInput,
  completed: todoCompletedInput,
})
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .openapi("CreateTodoBody");
```

Guidelines:

- Use input schema helpers for request validation, such as trimming strings.
- Use output schema helpers for response formatting, without request-only transforms.
- Omit server-owned fields from create and update body schemas.
- Add `.openapi(...)` names and examples so `/doc`, `/ui`, and `/scalar` stay useful.
- Export inferred types from the schemas file when services or handlers need them.

Response schemas should use the standard success envelope:

```ts
export const TodoResponseSchema = z
  .object({
    success: z.literal(true).openapi({ example: true }),
    data: TodoSchema,
  })
  .openapi("TodoResponse");
```

## Handlers

Handlers live in `handlers/*.handler.ts` and should stay focused on HTTP concerns.

Responsibilities:

- Use `AppRouteHandler<typeof routeName>` for route-aware typing.
- Read validated params, query, and body data with `c.req.valid(...)`.
- Read middleware variables with `c.get(...)`.
- Call a service function.
- Return a response envelope and the correct status constant.

Example:

```ts
export const createTodoHandler: AppRouteHandler<
  typeof createTodoRoute
> = async (c) => {
  const userId = c.get("userId");
  const body = c.req.valid("json");

  const todo = await createTodoService({
    userId,
    title: body.title,
    completed: body.completed,
  });

  return c.json(
    {
      success: true,
      data: todo,
    },
    CREATED,
  );
};
```

Do not put Drizzle queries directly in handlers. Use services and queries.

## Services

Services live in `services/*.service.ts` and own business logic.

Responsibilities:

- Accept typed input from handlers.
- Coordinate one or more query functions.
- Enforce domain rules.
- Throw typed `AppError` subclasses for expected failures.

Example:

```ts
export async function updateTodoService(input: UpdateTodoInput) {
  const todo = await updateTodo({
    id: input.id,
    userId: input.userId,
    title: input.title,
    completed: input.completed,
  });

  if (!todo) {
    throw new NotFoundError("Todo not found");
  }

  return todo;
}
```

Throw expected errors from `src/utils/errors.ts`, such as `NotFoundError`, `UnauthorizedError`, `BadRequestError`, or `ConflictError`. Unexpected errors should be allowed to bubble up to the global error handler.

## Queries

Queries live in `queries/*.query.ts` and are the only feature files that should call Drizzle directly.

Responsibilities:

- Get the database with `getDatabase()`.
- Read and write Drizzle tables.
- Return database records or `undefined` when a record was not found.
- Keep HTTP concerns out of the persistence layer.

Derive query input types from Drizzle table inference instead of API schemas:

```ts
type TodoInsert = typeof todosTable.$inferInsert;
type TodoSelect = typeof todosTable.$inferSelect;

type UpdateTodoData = Partial<Pick<TodoInsert, "title" | "completed">> & {
  id: TodoSelect["id"];
  userId: TodoSelect["userId"];
};
```

This keeps the persistence layer tied to the database contract, not the HTTP contract.

## Error Handling

All API errors should use the standard error envelope:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "fields": {
      "title": "Title is required"
    }
  }
}
```

Validation errors are created by `createAppRouter()` through the OpenAPI default hook:

```ts
defaultHook: (result) => {
  if (!result.success) {
    throw new ValidationError(formatZodErrors(result.error));
  }
};
```

Expected application errors should extend `AppError`. The global `app.onError(...)` handler in `src/app.ts` serializes `AppError`, `HTTPException`, and unexpected errors consistently.

Do not manually format error responses inside handlers unless there is a specific reason to bypass the shared error behavior.

## Authentication And Middleware

Route groups can apply middleware in `routes/index.ts`:

```ts
app.use("*", authMiddleware);
```

Middleware variables must be declared in `src/types/hono.ts`:

```ts
export type AppEnv = {
  Variables: {
    logger: pino.Logger;
    userId: number;
  };
};
```

Handlers should read middleware values with `c.get("userId")`, not from raw headers or request bodies.

## Database Workflow

The database schema lives in `src/db/schema.ts`. Shared column helpers live under `src/db/helpers/`.

After changing `src/db/schema.ts`, generate and apply migrations from `apps/backend`:

```sh
npx drizzle-kit generate
npx drizzle-kit migrate
```

Migration files are written to `drizzle/` based on `drizzle.config.ts`.

The backend reads the database URL from `DB_FILE_NAME`. The local default is:

```txt
DB_FILE_NAME=file:local.db
```

`src/index.ts` calls `setupDatabase()` before the server starts. Query functions should use `getDatabase()` and should not initialize the database themselves.

## Environment

Environment variables are validated in `env.ts`.

Current variables:

- `NODE_ENV`: `development` or `production`, defaults to `development`
- `LOG_LEVEL`: Pino log level, defaults to `debug`
- `DB_FILE_NAME`: libSQL database URL, defaults to `file:local.db`
- `PORT`: HTTP port, defaults to `3001`
- `CORS_ORIGINS`: comma-separated allowed origins, defaults to `http://localhost:5173`

Use `env.ts` for new environment variables so invalid configuration fails during startup.

## OpenAPI Documentation

OpenAPI is configured in `src/utils/configureOpenAPI.ts`.

When the backend is running, documentation is available at:

```txt
http://localhost:3001/doc     OpenAPI JSON
http://localhost:3001/ui      Swagger UI
http://localhost:3001/scalar  Scalar API reference
```

Keep route schemas and response schemas accurate. The frontend typed client and the generated OpenAPI docs both depend on them.

## Adding A New Feature

Follow this checklist:

1. Add or update Drizzle tables in `src/db/schema.ts` when persisted data changes.
2. From `apps/backend`, run `npx drizzle-kit generate` and `npx drizzle-kit migrate` when the database schema changed.
3. Add feature schemas in `src/api/<feature>/schemas/<feature>.schema.ts`.
4. Add query functions in `queries/` for Drizzle access.
5. Add service functions in `services/` for business logic and expected domain errors.
6. Add route definitions in `routes/*.route.ts` with request and response schemas.
7. Add handlers in `handlers/*.handler.ts` typed with `AppRouteHandler<typeof routeName>`.
8. Register handlers with routes in `routes/index.ts`.
9. Apply feature middleware in `routes/index.ts` when the whole route group needs it.
10. Register the feature route group in `src/routes.ts`.
11. Check `/doc`, `/ui`, or `/scalar` to confirm the OpenAPI contract is clear.
12. Run `npm run build -w @hono-starter/backend`.

## When Not To Use This Pattern

This pattern is intended for JSON API features backed by Hono, OpenAPI, Zod, and Drizzle.

Consider a different structure when:

- the endpoint is infrastructure-only and does not belong to a product feature, such as health checks
- the code is a cross-feature utility rather than feature-specific behavior
- the feature does not touch the database and a `queries/` folder would be empty

Even then, keep the same boundaries where they apply: route definitions document the HTTP contract, handlers adapt HTTP to application logic, services own business rules, and shared error envelopes remain consistent.
