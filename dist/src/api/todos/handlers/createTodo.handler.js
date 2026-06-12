import { createTodoService } from "../services/createTodo.service.js";
import { createTodoRoute } from "../todos.routes.js";
export const createTodoHandler = async (c) => {
    const userId = c.get("userId");
    const body = c.req.valid("json");
    const todo = await createTodoService({
        userId,
        title: body.title,
        completed: body.completed,
    });
    return c.json({
        success: true,
        data: todo,
    }, 201);
};
