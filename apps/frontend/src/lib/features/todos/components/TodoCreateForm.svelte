<script lang="ts">
  import {
    setError,
    setMessage,
    superForm,
    type SuperValidated,
  } from "sveltekit-superforms";
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
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import {
    createCreateTodoMutation,
    createUpdateTodoMutation,
    type Todo,
  } from "$lib/features/todos/data-access/todos.api.js";
  import {
    todoCreateFormSchema,
    type TodoCreateFormData,
  } from "$lib/features/todos/schemas.js";
  import { zod4Client } from "sveltekit-superforms/adapters";

  type Props = {
    data: SuperValidated<TodoCreateFormData, string>;
    todo?: Todo;
    onSaved?: (todo: Todo) => void;
    onCancelEdit?: () => void;
  };

  let { data, todo, onSaved, onCancelEdit }: Props = $props();

  const createTodoMutation = createCreateTodoMutation();
  const updateTodoMutation = createUpdateTodoMutation();

  const isEditing = $derived(todo !== undefined);
  const isPending = $derived(
    createTodoMutation.isPending || updateTodoMutation.isPending,
  );

  function getEditTodoId() {
    return todo?.id;
  }

  function getInitialFormData() {
    if (!todo) {
      return data;
    }

    return {
      ...data,
      data: {
        title: todo.title,
        completed: todo.completed,
      },
      errors: {},
      valid: true,
      posted: false,
    } satisfies SuperValidated<TodoCreateFormData, string>;
  }

  function getFieldError(fields: unknown, field: string) {
    if (typeof fields !== "object" || fields === null || !(field in fields)) {
      return undefined;
    }

    const value = (fields as Record<string, unknown>)[field];

    return typeof value === "string" ? value : undefined;
  }

  function applyApiError(
    form: SuperValidated<TodoCreateFormData, string>,
    err: ApiError,
  ) {
    const titleError = getFieldError(err.fields, "title");
    const completedError = getFieldError(err.fields, "completed");

    if (titleError) {
      setError(form, "title", titleError, { overwrite: true });
    }

    if (completedError) {
      setError(form, "completed", completedError, { overwrite: true });
    }

    if (!titleError && !completedError) {
      setError(form, "", err.message, { overwrite: true });
    }
  }

  const todoForm = superForm(getInitialFormData(), {
    SPA: true,
    validators: zod4Client(todoCreateFormSchema),
    resetForm: () => getEditTodoId() === undefined,
    clearOnSubmit: "errors-and-message",
    multipleSubmits: "prevent",
    async onUpdate({ form }) {
      if (!form.valid) {
        return;
      }

      try {
        const todoId = getEditTodoId();
        const savedTodo =
          todoId === undefined
            ? await createTodoMutation.mutateAsync(form.data)
            : await updateTodoMutation.mutateAsync({
                todoId,
                data: form.data,
              });

        setMessage(
          form,
          todoId === undefined
            ? "Todo created successfully."
            : "Todo updated successfully.",
        );

        if (todoId !== undefined) {
          onSaved?.(savedTodo);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          applyApiError(form, err);
          return;
        }

        setError(form, "", "Unable to create todo.", { overwrite: true });
      }
    },
  });

  const {
    form: formData,
    enhance,
    errors,
    message,
    submitting,
  } = todoForm;
</script>

<Card>
  <CardHeader>
    <CardTitle>{isEditing ? "Update todo" : "Add a todo"}</CardTitle>
    <CardDescription>
      {isEditing
        ? "Update the selected todo."
        : "Create a todo for the authenticated user."}
    </CardDescription>
  </CardHeader>

  <CardContent>
    <form method="POST" class="space-y-4" use:enhance>
      {#if $message}
        <Alert>
          <AlertDescription>{$message}</AlertDescription>
        </Alert>
      {/if}

      {#if $errors._errors?.length}
        <Alert variant="destructive">
          <AlertDescription>{$errors._errors[0]}</AlertDescription>
        </Alert>
      {/if}

      <Form.ElementField form={todoForm} name="title">
        {#snippet children({ constraints })}
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Title</Form.Label>
              <Input
                {...props}
                {...constraints}
                bind:value={$formData.title}
                placeholder="Learn TanStack Query"
              />
            {/snippet}
          </Form.Control>
          <Form.Description>Keep it short and actionable.</Form.Description>
          <Form.FieldErrors />
        {/snippet}
      </Form.ElementField>

      <Form.ElementField form={todoForm} name="completed">
        {#snippet children({ constraints })}
          <Form.Control>
            {#snippet children({ props })}
              <div class="flex items-center gap-2">
                <Checkbox
                  {...props}
                  {...constraints}
                  bind:checked={$formData.completed}
                />
                <Form.Label>Completed</Form.Label>
              </div>
            {/snippet}
          </Form.Control>
          <Form.Description>
            Mark the todo as already completed.
          </Form.Description>
          <Form.FieldErrors />
        {/snippet}
      </Form.ElementField>

      <Button
        type="submit"
        disabled={$submitting || isPending}
      >
        {#if $submitting || isPending}
          {isEditing ? "Saving..." : "Adding..."}
        {:else}
          {isEditing ? "Save changes" : "Add todo"}
        {/if}
      </Button>

      {#if isEditing}
        <Button type="button" variant="outline" onclick={onCancelEdit}>
          Cancel edit
        </Button>
      {/if}
    </form>
  </CardContent>
</Card>
