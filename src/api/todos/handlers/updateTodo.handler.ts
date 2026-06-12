import type { RouteHandler } from "@hono/zod-openapi";
import type { AppEnv } from "@/types/hono.js";
import { updateTodoRoute } from "../routes/updateTodo.route.js";
import { updateTodoService } from "../services/updateTodo.service.js";

export const updateTodoHandler: RouteHandler<
  typeof updateTodoRoute,
  AppEnv
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
    200,
  );
};
