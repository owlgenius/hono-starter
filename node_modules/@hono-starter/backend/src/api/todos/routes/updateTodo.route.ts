import { createRoute } from "@hono/zod-openapi";
import {
  TodoResponseSchema,
  UpdateTodoBodySchema,
  UpdateTodoParamsSchema,
} from "../schemas/todos.schema.js";
import {
  badRequestErrorResponse,
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
  UNPROCESSABLE_ENTITY,
} from "#src/utils/http-status-codes";

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
    [BAD_REQUEST]: badRequestErrorResponse,
    [UNAUTHORIZED]: unauthorizedResponse,
    [NOT_FOUND]: notFoundResponse("Todo"),
    [UNPROCESSABLE_ENTITY]: validationErrorResponse,
    [INTERNAL_SERVER_ERROR]: internalServerErrorResponse,
  },
});
