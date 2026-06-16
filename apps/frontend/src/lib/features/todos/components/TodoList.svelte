<script lang="ts">
  import type { Todo } from "$lib/features/todos/api.js";

  type Props = {
    todos: Todo[];
  };

  let { todos }: Props = $props();
</script>

<section class="space-y-3">
  <h2 class="text-lg font-medium">Your todos</h2>

  {#if todos.length > 0}
    <ul class="space-y-2">
      {#each todos as todo}
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
    <p
      class="text-muted-foreground rounded-lg border border-dashed p-6 text-sm"
    >
      No todos yet.
    </p>
  {/if}
</section>
