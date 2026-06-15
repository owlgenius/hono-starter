import { getDatabase } from "../../../db/config.js";
import { todosTable } from "../../../db/schema.js";
import { and, eq } from "drizzle-orm";
export async function updateTodo(data) {
    const db = getDatabase();
    const values = {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.completed !== undefined ? { completed: data.completed } : {}),
    };
    const [todo] = await db
        .update(todosTable)
        .set(values)
        .where(and(eq(todosTable.id, data.id), eq(todosTable.userId, data.userId)))
        .returning();
    return todo;
}
