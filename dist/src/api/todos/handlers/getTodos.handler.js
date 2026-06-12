import { getTodosService } from "../services/getTodos.service.js";
export const getTodosHandler = async (c) => {
    const userId = c.get("userId");
    const todos = await getTodosService({
        userId,
    });
    return c.json({
        success: true,
        data: todos,
    }, 200);
};
