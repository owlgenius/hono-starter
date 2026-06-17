<script lang="ts">
  import { dev } from "$app/environment";
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
  {@render children()}

  {#if dev}
    <SvelteQueryDevtools />
  {/if}
</QueryClientProvider>
