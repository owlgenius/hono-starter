import { createRoute } from "@hono/zod-openapi";
import { TodosListResponseSchema } from "../schemas/todos.schema.js";
import {
  internalServerErrorResponse,
  unauthorizedResponse,
} from "../../common/openapi/responses.js";
import {
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "@/utils/http-status-codes.js";

export const getTodosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Todos"],
  security: [{ Bearer: [] }],
  summary: "Get authenticated user's todos",
  responses: {
    [OK]: {
      description: "Todos retrieved successfully",
      content: {
        "application/json": {
          schema: TodosListResponseSchema,
        },
      },
    },
    [UNAUTHORIZED]: unauthorizedResponse,
    [INTERNAL_SERVER_ERROR]: internalServerErrorResponse,
  },
});
