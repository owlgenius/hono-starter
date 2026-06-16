import type { AppRouteHandler } from "#src/types/hono";
import { updateTodoRoute } from "../routes/updateTodo.route.js";
import { updateTodoService } from "../services/updateTodo.service.js";
import { OK } from "#src/utils/http-status-codes";

export const updateTodoHandler: AppRouteHandler<
  typeof updateTodoRoute
> = async (c) => {
  const userId = c.get("userId");
  const { todoId } = c.req.valid("param");
  const body = c.req.valid("json");

  const todo = await updateTodoService({
    id: todoId,
    userId,
    title: body.title,
    completed: body.completed,
  });

  return c.json(
    {
      success: true,
      data: todo,
    },
    OK,
  );
};
