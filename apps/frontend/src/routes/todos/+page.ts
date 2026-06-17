import { getTodosQueryOptions } from "$lib/features/todos/data-access/todos.api.js";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, fetch }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery(getTodosQueryOptions(fetch));
};
