import { createAppRouter } from "@/utils/createAppRouter.js";
import { authMiddleware } from "../../users/middleware/auth.middleware.js";
import { getTodosHandler } from "../handlers/getTodos.handler.js";
import { createTodoHandler } from "../handlers/createTodo.handler.js";
import { updateTodoHandler } from "../handlers/updateTodo.handler.js";

import { getTodosRoute } from "./getTodos.route.js";
import { createTodoRoute } from "./createTodo.route.js";
import { updateTodoRoute } from "./updateTodo.route.js";

const app = createAppRouter();

app.use("*", authMiddleware);

const todosRoutes = app
  .openapi(getTodosRoute, getTodosHandler)
  .openapi(createTodoRoute, createTodoHandler)
  .openapi(updateTodoRoute, updateTodoHandler);

export default todosRoutes;
