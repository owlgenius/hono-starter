export const todosQueryKeys = {
  all: ["todos"] as const,
  list: () => [...todosQueryKeys.all, "list"] as const,
  details: (todoId: number) => [...todosQueryKeys.all, "details", todoId] as const,
};
