import { createRoute } from "@hono/zod-openapi";
import {
  TodoResponseSchema,
  UpdateTodoBodySchema,
  UpdateTodoParamsSchema,
} from "../schemas/todos.schema.js";
import {
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "../../common/openapi/responses.js";

export const updateTodoRoute = createRoute({
  method: "put",
  path: "/{todoId}",
  tags: ["Todos"],
  security: [{ Bearer: [] }],
  summary: "Update a todo",
  request: {
    params: UpdateTodoParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdateTodoBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Todo updated successfully",
      content: {
        "application/json": {
          schema: TodoResponseSchema,
        },
      },
    },
    400: validationErrorResponse,
    401: unauthorizedResponse,
    404: notFoundResponse("Todo"),
    500: internalServerErrorResponse,
  },
});
