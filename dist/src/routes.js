import todosRoutes from "./api/todos/todos.routes.js";
import { createAppRouter } from "./utils/createAppRouter.js";
const routes = createAppRouter();
routes.get("/health", (c) => {
  return c.json({
    success: true,
    status: "ok",
  });
});
routes.route("/todos", todosRoutes);
export default routes;
