import { createTodo } from "../queries/createTodo.query.js";
export async function createTodoService(input) {
    return createTodo({
        userId: input.userId,
        title: input.title,
        completed: input.completed,
    });
}
