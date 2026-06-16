import { createRoute } from "@hono/zod-openapi";
import { CreateTodoBodySchema, TodoResponseSchema, } from "../schemas/todos.schema.js";
import { badRequestErrorResponse, internalServerErrorResponse, unauthorizedResponse, validationErrorResponse, } from "../../common/openapi/responses.js";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, UNAUTHORIZED, UNPROCESSABLE_ENTITY, } from "#src/utils/http-status-codes";
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
        [CREATED]: {
            description: "Todo created successfully",
            content: {
                "application/json": {
                    schema: TodoResponseSchema,
                },
            },
        },
        [BAD_REQUEST]: badRequestErrorResponse,
        [UNAUTHORIZED]: unauthorizedResponse,
        [UNPROCESSABLE_ENTITY]: validationErrorResponse,
        [INTERNAL_SERVER_ERROR]: internalServerErrorResponse,
    },
});
