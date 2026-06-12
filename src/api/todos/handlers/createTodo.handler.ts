import type { RouteHandler } from "@hono/zod-openapi";
import type { AppEnv } from "@/types/hono.js";
import { createTodoService } from "../services/createTodo.service.js";
import { createTodoRoute } from "../routes/createTodo.route.js";

export const createTodoHandler: RouteHandler<
  typeof createTodoRoute,
  AppEnv
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
    201,
  );
};
