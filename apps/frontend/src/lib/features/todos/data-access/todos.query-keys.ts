export const todosQueryKeys = {
  all: ["todos"] as const,
  list: () => [...todosQueryKeys.all, "list"] as const,
  create: () => [...todosQueryKeys.all, "create"] as const,
};
