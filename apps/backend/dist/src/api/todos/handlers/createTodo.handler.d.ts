import type { AppRouteHandler } from "../../../types/hono.js";
import { createTodoRoute } from "../routes/createTodo.route.js";
export declare const createTodoHandler: AppRouteHandler<typeof createTodoRoute>;
