<script lang="ts">
  import TodoCreateForm from "$lib/features/todos/components/TodoCreateForm.svelte";
  import TodoList from "$lib/features/todos/components/TodoList.svelte";
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

  <TodoCreateForm />
  <TodoList />
</main>
