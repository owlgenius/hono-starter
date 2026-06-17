<script lang="ts">
  import { Alert, AlertDescription } from "$lib/components/ui/alert/index.js";
  import { createTodosQuery } from "$lib/features/todos/data-access/todos.api.js";

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
        <li class="rounded-lg border p-3">
          <div class="flex items-center justify-between gap-4">
            <span class:line-through={todo.completed}>
              {todo.title}
            </span>

            <span class="text-muted-foreground text-sm">
              {todo.completed ? "Completed" : "Open"}
            </span>
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
