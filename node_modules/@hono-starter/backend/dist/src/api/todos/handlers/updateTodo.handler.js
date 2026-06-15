import { updateTodoRoute } from "../routes/updateTodo.route.js";
import { updateTodoService } from "../services/updateTodo.service.js";
import { OK } from "@/utils/http-status-codes.js";
export const updateTodoHandler = async (c) => {
    const userId = c.get("userId");
    const { todoId } = c.req.valid("param");
    const body = c.req.valid("json");
    const todo = await updateTodoService({
        id: todoId,
        userId,
        title: body.title,
        completed: body.completed,
    });
    return c.json({
        success: true,
        data: todo,
    }, OK);
};
