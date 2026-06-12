import { updateTodo } from "../queries/updateTodo.query.js";
import {NotFoundError} from "../../../utils/errors.js";
import type {TodoIdParams, UpdateTodoBody} from "../schemas/todos.schema.js";

type UpdateTodoInput = UpdateTodoBody & {
  id: TodoIdParams["todoId"];
  userId: number;
}

export async function updateTodoService(input: UpdateTodoInput) {
  const todo = await updateTodo({
    id: input.id,
    userId: input.userId,
    title: input.title,
    completed: input.completed,
  });

  if (!todo) {
    throw new NotFoundError("Todo not found");
  }

  return todo;
}
