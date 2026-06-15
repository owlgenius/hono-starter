import { getDatabase } from "../../../db/config.js";
import { todosTable } from "../../../db/schema.js";
export async function createTodo(data) {
    const db = getDatabase();
    const [todo] = await db
        .insert(todosTable)
        .values({
        userId: data.userId,
        title: data.title,
        ...(data.completed !== undefined ? { completed: data.completed } : {}),
    })
        .returning();
    return todo;
}
