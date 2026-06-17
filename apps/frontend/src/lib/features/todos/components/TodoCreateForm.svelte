<script lang="ts">
  import { ApiError } from "$lib/api/errors.js";
  import { Alert, AlertDescription } from "$lib/components/ui/alert/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { createCreateTodoMutation } from "$lib/features/todos/data-access/todos.api.js";
  import {
    todoCreateFormSchema,
    type TodoCreateFormData,
  } from "$lib/features/todos/schemas.js";

  type FieldErrors = Partial<Record<keyof TodoCreateFormData, string>>;

  let title = $state("");
  let completed = $state(false);
  let fieldErrors = $state<FieldErrors>({});
  let formError = $state<string | undefined>();
  let message = $state<string | undefined>();

  const createTodoMutation = createCreateTodoMutation();

  function getFieldError(fields: unknown, field: string) {
    if (typeof fields !== "object" || fields === null || !(field in fields)) {
      return undefined;
    }

    const value = (fields as Record<string, unknown>)[field];

    return typeof value === "string" ? value : undefined;
  }

  function getValidationErrors(data: unknown) {
    const result = todoCreateFormSchema.safeParse(data);

    if (result.success) {
      return {
        data: result.data,
        errors: undefined,
      };
    }

    const flattened = result.error.flatten().fieldErrors;
    const errors: FieldErrors = {};

    if (flattened.title?.[0]) {
      errors.title = flattened.title[0];
    }

    if (flattened.completed?.[0]) {
      errors.completed = flattened.completed[0];
    }

    return {
      data: undefined,
      errors,
    };
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    fieldErrors = {};
    formError = undefined;
    message = undefined;

    const validation = getValidationErrors({
      title,
      completed,
    });

    if (validation.errors) {
      fieldErrors = validation.errors;
      return;
    }

    try {
      await createTodoMutation.mutateAsync(validation.data);

      title = "";
      completed = false;
      message = "Todo created successfully.";
    } catch (err) {
      if (err instanceof ApiError) {
        const titleError = getFieldError(err.fields, "title");
        const completedError = getFieldError(err.fields, "completed");

        if (titleError || completedError) {
          fieldErrors = {
            ...(titleError ? { title: titleError } : {}),
            ...(completedError ? { completed: completedError } : {}),
          };
          return;
        }

        formError = err.message;
        return;
      }

      formError = "Unable to create todo.";
    }
  }
</script>

<Card>
  <CardHeader>
    <CardTitle>Add a todo</CardTitle>
    <CardDescription>Create a todo for the authenticated user.</CardDescription>
  </CardHeader>

  <CardContent>
    <form class="space-y-4" onsubmit={handleSubmit}>
      {#if message}
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      {/if}

      {#if formError}
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      {/if}

      <div class="space-y-2">
        <Label for="title">Title</Label>
        <Input
          id="title"
          name="title"
          bind:value={title}
          aria-invalid={!!fieldErrors.title}
          placeholder="Learn SvelteKit actions"
        />

        {#if fieldErrors.title}
          <p class="text-destructive text-sm">{fieldErrors.title}</p>
        {:else}
          <p class="text-muted-foreground text-sm">
            Keep it short and actionable.
          </p>
        {/if}
      </div>

      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <Checkbox
            id="completed"
            name="completed"
            bind:checked={completed}
            aria-invalid={!!fieldErrors.completed}
          />
          <Label for="completed">Completed</Label>
        </div>

        {#if fieldErrors.completed}
          <p class="text-destructive text-sm">{fieldErrors.completed}</p>
        {:else}
          <p class="text-muted-foreground text-sm">
            Mark the todo as already completed.
          </p>
        {/if}
      </div>

      <Button type="submit" disabled={createTodoMutation.isPending}>
        {createTodoMutation.isPending ? "Adding..." : "Add todo"}
      </Button>
    </form>
  </CardContent>
</Card>
