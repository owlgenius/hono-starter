import { createTodo } from "../queries/createTodo.query.js";
import type { CreateTodoBody } from "../schemas/todos.schema.js";

type CreateTodoInput = CreateTodoBody & {
  userId: number;
};

export async function createTodoService(input: CreateTodoInput) {
  return createTodo({
    userId: input.userId,
    title: input.title,
    completed: input.completed,
  });
}
