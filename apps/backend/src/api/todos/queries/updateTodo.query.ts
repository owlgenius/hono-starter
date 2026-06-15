import { getDatabase } from "../../../db/config.js";
import { todosTable } from "../../../db/schema.js";
import { and, eq } from "drizzle-orm";

// Query inputs are derived from the Drizzle table instead of API schemas so the
// persistence layer stays tied to the database contract, not the HTTP contract.
// Use $inferInsert for values we write into the table, because generated/default
// columns may be optional on insert. Use $inferSelect for values that identify
// existing rows in filters, where columns like id/userId are already concrete.
type TodoInsert = typeof todosTable.$inferInsert;
type TodoSelect = typeof todosTable.$inferSelect;
type TodoUpdate = Partial<Pick<TodoInsert, "title" | "completed">>;

type UpdateTodoData = TodoUpdate & {
  id: TodoSelect["id"];
  userId: TodoSelect["userId"];
};

export async function updateTodo(data: UpdateTodoData) {
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
