import { createRoute } from "@hono/zod-openapi";
import {
  CreateTodoBodySchema,
  TodoResponseSchema,
} from "../schemas/todos.schema.js";
import {
  internalServerErrorResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "../../common/openapi/responses.js";

export const createTodoRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Todos"],
  security: [{ Bearer: [] }],
  summary: "Create a todo",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateTodoBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Todo created successfully",
      content: {
        "application/json": {
          schema: TodoResponseSchema,
        },
      },
    },
    400: validationErrorResponse,
    401: unauthorizedResponse,
    500: internalServerErrorResponse,
  },
});
