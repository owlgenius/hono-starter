import { eq } from "drizzle-orm";
import { getDatabase } from "../../../db/config.js";
import { todosTable } from "../../../db/schema.js";

// Query inputs are derived from the Drizzle table instead of API schemas so the
// persistence layer stays tied to the database contract, not the HTTP contract.
type TodoSelect = typeof todosTable.$inferSelect;

export async function getTodosByUserId(userId: TodoSelect["userId"]) {
  const db = getDatabase();

  return db
    .select()
    .from(todosTable)
    .where(eq(todosTable.userId, userId));
}
