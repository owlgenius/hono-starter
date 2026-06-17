import {
  createMutation,
  createQuery,
  mutationOptions,
  queryOptions,
  useQueryClient,
  type QueryClient,
} from "@tanstack/svelte-query";
import type { ApiFetch } from "$lib/api/client.js";
import { createTodo, getTodos } from "./todos.service.js";
import { todosQueryKeys } from "./todos.query-keys.js";
import type { CreateTodoInput, Todo } from "./todos.service.js";

export type { CreateTodoInput, Todo };

export function getTodosQueryOptions(fetch?: ApiFetch) {
  return queryOptions({
    queryKey: todosQueryKeys.list(),
    queryFn: () => getTodos(fetch),
  });
}

export function createTodosQuery(fetch?: ApiFetch) {
  return createQuery(() => getTodosQueryOptions(fetch));
}

export function getCreateTodoMutationOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationKey: todosQueryKeys.create(),
    mutationFn: (input: CreateTodoInput) => createTodo(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: todosQueryKeys.list(),
      });
    },
  });
}

export function createCreateTodoMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => getCreateTodoMutationOptions(queryClient));
}
