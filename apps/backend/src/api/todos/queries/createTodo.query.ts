import { getDatabase } from "../../../db/config.js";
import { todosTable } from "../../../db/schema.js";

// Query inputs are derived from the Drizzle table instead of API schemas so the
// persistence layer stays tied to the database contract, not the HTTP contract.
type TodoInsert = typeof todosTable.$inferInsert;

type CreateTodoData = Pick<TodoInsert, "userId" | "title" | "completed">;

export async function createTodo(data: CreateTodoData) {
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
