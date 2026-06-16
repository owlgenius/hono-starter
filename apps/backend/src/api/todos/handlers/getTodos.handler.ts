import type { AppRouteHandler } from "#src/types/hono";
import { getTodosService } from "../services/getTodos.service.js";
import type { getTodosRoute } from "../routes/getTodos.route.js";
import { OK } from "#src/utils/http-status-codes";

export const getTodosHandler: AppRouteHandler<typeof getTodosRoute> = async (
  c,
) => {
  const userId = c.get("userId");

  const todos = await getTodosService({
    userId,
  });

  return c.json(
    {
      success: true,
      data: todos,
    },
    OK,
  );
};
