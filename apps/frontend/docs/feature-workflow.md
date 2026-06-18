# Frontend Feature Workflow

This guide documents the conventions used by the todos feature. New dashboard/admin features should follow this structure unless there is a clear reason to choose a different pattern.

## Goals

- Keep backend API calls behind a typed feature boundary.
- Use TanStack Query for client-side server state.
- Use Zod and Superforms for feature-local form validation.
- Use shadcn-svelte components for UI primitives.
- Keep route files focused on loading, prefetching, and composition.
- Keep feature components reusable and unaware of raw Hono client details.

## Current Example

The todos feature lives here:

```txt
src/lib/features/todos/
  components/
    TodoCreateForm.svelte
    TodoList.svelte
  data-access/
    todos.api.ts
    todos.query-keys.ts
    todos.service.ts
  schemas.ts

src/routes/todos/
  +page.server.ts
  +page.ts
  +page.svelte
```

The backend owns the database schema and derives its API schemas from Drizzle. The frontend owns its form schemas for user-facing form validation.

## Folder Responsibilities

Use this structure for new features:

```txt
src/lib/features/<feature>/
  components/       Svelte UI components for the feature
  data-access/      API calls, query keys, query options, mutations
  schemas.ts        Frontend form schemas
```

Route files should stay in `src/routes/<route>/` and compose the feature pieces.

## API Boundary

Raw Hono client usage is centralized in `src/lib/api`:

```txt
src/lib/api/client.ts    creates the typed hc client
src/lib/api/response.ts  unwraps API response envelopes
src/lib/api/errors.ts    normalizes API errors
```

Feature code should not call `hc` directly outside `data-access/*.service.ts`.

Do this:

```ts
const todos = await getTodos(fetch);
```

Do not do this in components or route files:

```ts
api.todos.$get();
```

The shared `unwrapApiData` helper returns domain data, not raw API envelopes. For example, `getTodos()` returns `Todo[]`, not `{ success: true, data: Todo[] }`.

## Data Access Layer

Each feature should split data access into three files.

### `*.service.ts`

This file contains raw API calls and inferred API types.

Responsibilities:

- Create the typed API client.
- Call Hono endpoints.
- Infer request and response types with `InferRequestType` and `InferResponseType`.
- Return unwrapped domain data.

Example from todos:

```ts
export async function getTodos(fetch?: ApiFetch): Promise<Todo[]> {
  const api = createApiClient(fetch);
  const response = await api.todos.$get();

  return unwrapApiData<GetTodosResponse>(response);
}
```

### `*.query-keys.ts`

This file centralizes TanStack Query keys.

Example:

```ts
export const todosQueryKeys = {
  all: ["todos"] as const,
  list: () => [...todosQueryKeys.all, "list"] as const,
  details: (todoId: number) =>
    [...todosQueryKeys.all, "details", todoId] as const,
};
```

Keep query keys stable and feature-scoped.

### `*.api.ts`

This file exposes query options, query hooks, mutation options, and mutation hooks.

Responsibilities:

- Wrap service functions in TanStack Query helpers.
- Export feature-level types from the service file.
- Invalidate affected query keys after mutations.
- Keep components free from query key details.

Example from todos:

```ts
export function createTodosQuery(fetch?: ApiFetch) {
  return createQuery(() => getTodosQueryOptions(fetch));
}
```

For mutations, invalidate the smallest correct set of keys. The todos create mutation invalidates the list. The update mutation invalidates the list and the updated todo detail key.

## Route Responsibilities

Use route files for orchestration, not feature internals.

### `+page.server.ts`

Use this for server-created form data and server-only setup.

In the todos feature, this initializes the Superforms form:

```ts
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(todoCreateFormSchema)),
  };
};
```

### `+page.ts`

Use this for client-side page loading and query prefetching.

In the todos feature, this prefetches the todos query:

```ts
export const load: PageLoad = async ({ parent, fetch, data }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery(getTodosQueryOptions(fetch));

  return data;
};
```

### `+page.svelte`

Use this for page composition and small route-local UI state.

The todos page owns `selectedTodo` because edit selection is page UI state:

```ts
let selectedTodo = $state<Todo | undefined>();
```

Server state, such as the todo list, should stay in TanStack Query.

## TanStack Query

The app-level query client is created in `src/routes/+layout.ts` and provided in `src/routes/+layout.svelte`.

Current defaults:

```ts
queries: {
  enabled: browser,
  refetchOnWindowFocus: true,
  staleTime: 1000 * 60 * 5,
}
```

Use TanStack Query for dashboard/admin server state that benefits from:

- caching
- invalidation
- prefetching
- loading and error states
- mutations without full page reloads

Do not copy server state into Svelte `$state` unless it is truly local UI state.

## Forms

Frontend forms use Zod, Superforms, and shadcn-svelte form primitives.

Each feature owns its frontend form schemas in `schemas.ts`:

```ts
export const todoCreateFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  completed: z.boolean().default(false),
});
```

Frontend form schemas are for user-facing form validation. Backend validation remains independent and authoritative.

Use `superValidate` in the server load to create initial form data. Use `superForm` in the Svelte component.

The current todos form uses SPA mode because create/update are handled by TanStack Query mutations:

```ts
const todoForm = superForm(getInitialFormData(), {
  SPA: true,
  validators: zod4Client(todoCreateFormSchema),
  resetForm: () => getEditTodoId() === undefined,
  clearOnSubmit: "errors-and-message",
  multipleSubmits: "prevent",
  async onUpdate({ form }) {
    // run mutation here
  },
});
```

Use shadcn-svelte form components for labels, controls, descriptions, and errors:

```svelte
<Form.ElementField form={todoForm} name="title">
  {#snippet children({ constraints })}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Title</Form.Label>
        <Input {...props} {...constraints} bind:value={$formData.title} />
      {/snippet}
    </Form.Control>
    <Form.Description>Keep it short and actionable.</Form.Description>
    <Form.FieldErrors />
  {/snippet}
</Form.ElementField>
```

## Error Handling

Backend errors should be normalized at the API boundary with `ApiError`.

Feature forms should map API validation errors back into Superforms errors:

```ts
if (err instanceof ApiError) {
  applyApiError(form, err);
  return;
}
```

Use field errors when possible. Use a form-level error for non-field failures.

## Superforms Adapter Note

Application code imports Superforms adapters from the documented path:

```ts
import { zod4, zod4Client } from "sveltekit-superforms/adapters";
```

This project aliases that path in `vite.config.ts` to `src/lib/superforms/adapters.ts`.

Reason: the public Superforms adapter barrel imports every optional validation adapter. With Vite 8/Rolldown, those optional imports are validated before unused adapters are tree-shaken. The alias exposes only the official Zod v4 adapters used by this app.

Do not import directly from `node_modules` in feature code.

## Backend Contract

The backend remains the source of truth for persisted data and API validation.

For todos, backend schemas are derived from Drizzle:

```ts
createSelectSchema(todosTable, ...)
createInsertSchema(todosTable, ...)
createUpdateSchema(todosTable, ...)
```

Frontend schemas should not be treated as security boundaries. They improve UX and client-side correctness, but the backend must still validate every request.

## Adding A New Feature

Follow this checklist:

1. Add backend endpoint and export its type through the backend API routes.
2. Add frontend service functions in `data-access/<feature>.service.ts`.
3. Infer request/response types from the Hono client.
4. Add query keys in `data-access/<feature>.query-keys.ts`.
5. Add query options/hooks and mutation options/hooks in `data-access/<feature>.api.ts`.
6. Add frontend form schemas in `schemas.ts` when the feature has forms.
7. Add components under `components/`.
8. In the route, initialize forms in `+page.server.ts`.
9. Prefetch queries in `+page.ts` when the page should have data ready on navigation.
10. Compose components and route-local UI state in `+page.svelte`.
11. Invalidate query keys after mutations.
12. Run `npm run check -w @hono-starter/frontend` and `npm run build -w @hono-starter/frontend`.

## When Not To Use This Pattern

This dashboard pattern assumes JavaScript-enabled, client-interactive admin UI.

Consider a server-action-first form pattern instead when:

- the page must work fully without JavaScript
- mutation logic must stay entirely server-side
- the feature is a public form rather than an admin dashboard interaction

For dashboard/admin features, use the TanStack Query + SPA Superforms pattern by default.
