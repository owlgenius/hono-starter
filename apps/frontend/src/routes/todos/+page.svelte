<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Todos</title>
</svelte:head>

<main class="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
  <header class="space-y-2">
    <p class="text-muted-foreground text-sm font-medium">Example feature</p>
    <h1 class="text-3xl font-semibold tracking-tight">Todos</h1>
    <p class="text-muted-foreground">
      Manage todos for the authenticated user.
    </p>
  </header>

  <section class="space-y-3">
    <h2 class="text-lg font-medium">Your todos</h2>

    {#if data.todos.length > 0}
      <ul class="space-y-2">
        {#each data.todos as todo}
          <li class="rounded-lg border p-3">
            <div class="flex items-center justify-between gap-4">
							<span class:line-through={todo.completed}>
								{todo.title}
							</span>

              <span class="text-muted-foreground text-sm">
								{todo.completed ? 'Completed' : 'Open'}
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
</main>
