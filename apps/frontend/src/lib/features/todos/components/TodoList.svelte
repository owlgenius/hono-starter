<script lang="ts">
  import { Alert, AlertDescription } from "$lib/components/ui/alert/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import {
    createTodosQuery,
    type Todo,
  } from "$lib/features/todos/data-access/todos.api.js";

  type Props = {
    selectedTodoId?: Todo["id"];
    onEdit?: (todo: Todo) => void;
  };

  let { selectedTodoId, onEdit }: Props = $props();

  const todosQuery = createTodosQuery();
</script>

<section class="space-y-3">
  <h2 class="text-lg font-medium">Your todos</h2>

  {#if todosQuery.isPending}
    <p class="text-muted-foreground rounded-lg border border-dashed p-6 text-sm">
      Loading todos...
    </p>
  {:else if todosQuery.isError}
    <Alert variant="destructive">
      <AlertDescription>
        {todosQuery.error.message}
      </AlertDescription>
    </Alert>
  {:else if todosQuery.data.length > 0}
    <ul class="space-y-2">
      {#each todosQuery.data as todo}
        <li
          class="rounded-lg border p-3"
          class:border-primary={selectedTodoId === todo.id}
        >
          <div class="flex items-center justify-between gap-4">
            <span class:line-through={todo.completed}>
              {todo.title}
            </span>

            <div class="flex items-center gap-3">
              <span class="text-muted-foreground text-sm">
                {todo.completed ? "Completed" : "Open"}
              </span>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onclick={() => onEdit?.(todo)}
              >
                Edit
              </Button>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-muted-foreground rounded-lg border border-dashed p-6 text-sm">
      No todos yet.
    </p>
  {/if}
</section>
