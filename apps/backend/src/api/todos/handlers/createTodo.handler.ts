import type { AppRouteHandler } from "#src/types/hono";
import { createTodoService } from "../services/createTodo.service.js";
import { createTodoRoute } from "../routes/createTodo.route.js";
import { CREATED } from "#src/utils/http-status-codes";

export const createTodoHandler: AppRouteHandler<
  typeof createTodoRoute
> = async (c) => {
  const userId = c.get("userId");
  const body = c.req.valid("json");

  const todo = await createTodoService({
    userId,
    title: body.title,
    completed: body.completed,
  });

  return c.json(
    {
      success: true,
      data: todo,
    },
    CREATED,
  );
};
