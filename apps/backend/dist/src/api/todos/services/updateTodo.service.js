import { updateTodo } from "../queries/updateTodo.query.js";
import { NotFoundError } from "../../../utils/errors.js";
export async function updateTodoService(input) {
    const todo = await updateTodo({
        id: input.id,
        userId: input.userId,
        title: input.title,
        completed: input.completed,
    });
    if (!todo) {
        throw new NotFoundError("Todo not found");
    }
    return todo;
}
