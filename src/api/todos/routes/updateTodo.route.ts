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
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "@/utils/http-status-codes.js";

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
    [OK]: {
      description: "Todo updated successfully",
      content: {
        "application/json": {
          schema: TodoResponseSchema,
        },
      },
    },
    [BAD_REQUEST]: validationErrorResponse,
    [UNAUTHORIZED]: unauthorizedResponse,
    [NOT_FOUND]: notFoundResponse("Todo"),
    [INTERNAL_SERVER_ERROR]: internalServerErrorResponse,
  },
});
