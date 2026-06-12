import type { RouteHandler } from "@hono/zod-openapi";
import type { AppEnv } from "@/types/hono.js";
import { getTodosService } from "../services/getTodos.service.js";
import type { getTodosRoute } from "../routes/getTodos.route.js";

export const getTodosHandler: RouteHandler<
  typeof getTodosRoute,
  AppEnv
> = async (c) => {
  const userId = c.get("userId");

  const todos = await getTodosService({
    userId,
  });

  return c.json(
    {
      success: true,
      data: todos,
    },
    200,
  );
};
