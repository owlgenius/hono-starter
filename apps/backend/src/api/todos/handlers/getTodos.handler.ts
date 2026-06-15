import type { AppRouteHandler } from "@/types/hono.js";
import { getTodosService } from "../services/getTodos.service.js";
import type { getTodosRoute } from "../routes/getTodos.route.js";
import { OK } from "@/utils/http-status-codes.js";

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
