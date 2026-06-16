import { getTodosService } from "../services/getTodos.service.js";
import { OK } from "#src/utils/http-status-codes";
export const getTodosHandler = async (c) => {
    const userId = c.get("userId");
    const todos = await getTodosService({
        userId,
    });
    return c.json({
        success: true,
        data: todos,
    }, OK);
};
