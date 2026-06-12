import { createRoute } from "@hono/zod-openapi";
import { authMiddleware } from "../users/middleware/auth.middleware.js";
import { createAppRouter } from "../../utils/createAppRouter.js";
import { getTodosHandler } from "./handlers/getTodos.handler.js";
import { createTodoHandler } from "./handlers/createTodo.handler.js";
import { CreateTodoBodySchema, TodoResponseSchema, TodosListResponseSchema, UpdateTodoBodySchema, } from "./schemas/todos.schema.js";
import { ErrorResponseSchema, NotFoundErrorResponseSchema, UnauthorizedErrorResponseSchema, ValidationErrorResponseSchema, } from "../common/schemas/response.schema.js";
const todosRoutes = createAppRouter();
todosRoutes.use("*", authMiddleware);
export const getTodosRoute = createRoute({
    method: "get",
    path: "/",
    tags: ["Todos"],
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
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: UnauthorizedErrorResponseSchema,
                },
            },
        },
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
export const createTodoRoute = createRoute({
    method: "post",
    path: "/",
    tags: ["Todos"],
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
        400: {
            description: "Validation failed",
            content: {
                "application/json": {
                    schema: ValidationErrorResponseSchema,
                },
            },
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: UnauthorizedErrorResponseSchema,
                },
            },
        },
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
export const updateTodoRoute = createRoute({
    method: "put",
    path: "/",
    tags: ["Todos"],
    summary: "Update a todo",
    request: {
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
        201: {
            description: "Todo updated successfully",
            content: {
                "application/json": {
                    schema: TodoResponseSchema,
                },
            },
        },
        400: {
            description: "Validation failed",
            content: {
                "application/json": {
                    schema: ValidationErrorResponseSchema,
                },
            },
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: UnauthorizedErrorResponseSchema,
                },
            },
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: NotFoundErrorResponseSchema("Todo"),
                },
            }
        },
        500: {
            description: "Internal server error",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema,
                },
            },
        },
    },
});
todosRoutes.openapi(getTodosRoute, getTodosHandler);
todosRoutes.openapi(createTodoRoute, createTodoHandler);
todosRoutes.openapi(updateTodoRoute, createTodoHandler);
export default todosRoutes;
