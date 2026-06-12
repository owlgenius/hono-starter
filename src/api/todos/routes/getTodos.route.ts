import { createRoute } from "@hono/zod-openapi";
import { TodosListResponseSchema } from "../schemas/todos.schema.js";
import {
  internalServerErrorResponse,
  unauthorizedResponse,
} from "../../common/openapi/responses.js";

export const getTodosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Todos"],
  security: [{ Bearer: [] }],
  summary: "Get authenticated user's todos",
  responses: {
    200: {
      description: "Todos retrieved successfully",
      content: {
        "application/json": {
          schema: TodosListResponseSchema,
        },
      },
    },
    401: unauthorizedResponse,
    500: internalServerErrorResponse,
  },
});
