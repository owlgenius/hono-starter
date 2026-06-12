import todosRoutes from "./api/todos/routes/index.js";
import { createAppRouter } from "./utils/createAppRouter.js";
import { createRoute, z } from "@hono/zod-openapi";

const routes = createAppRouter();

const healthRoute = createRoute({
  method: "get",
  path: "/health",
  tags: ["Health"],
  summary: "Health check",
  responses: {
    200: {
      description: "API is healthy",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            status: z.literal("ok"),
          }),
        },
      },
    },
  },
});

routes.openapi(healthRoute, (c) => {
  return c.json(
    {
      success: true,
      status: "ok",
    },
    200,
  );
});

routes.route("/todos", todosRoutes);

export default routes;
