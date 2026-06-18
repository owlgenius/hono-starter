import {
  createMutation,
  createQuery,
  mutationOptions,
  queryOptions,
  useQueryClient,
  type QueryClient,
} from "@tanstack/svelte-query";
import type { ApiFetch } from "$lib/api/client.js";
import { createTodo, getTodos, updateTodo } from "./todos.service.js";
import { todosQueryKeys } from "./todos.query-keys.js";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "./todos.service.js";

export type { CreateTodoInput, Todo, UpdateTodoInput };

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

export function getUpdateTodoMutationOptions(queryClient: QueryClient) {
  return mutationOptions({
    mutationFn: (input: UpdateTodoInput) => updateTodo(input),
    onSuccess: (todo) => {
      void queryClient.invalidateQueries({
        queryKey: todosQueryKeys.list(),
      });

      void queryClient.invalidateQueries({
        queryKey: todosQueryKeys.details(todo.id),
      });
    },
  });
}

export function createUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return createMutation(() => getUpdateTodoMutationOptions(queryClient));
}
