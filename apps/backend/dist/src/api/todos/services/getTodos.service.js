import { getTodosByUserId } from "../queries/getTodosByUserId.query.js";
export async function getTodosService(input) {
    return getTodosByUserId(input.userId);
}
