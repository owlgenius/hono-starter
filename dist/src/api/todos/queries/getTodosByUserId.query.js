import { eq } from "drizzle-orm";
import { getDatabase } from "../../../db/config.js";
import { todosTable } from "../../../db/schema.js";
export async function getTodosByUserId(userId) {
  const db = getDatabase();
  return db.select().from(todosTable).where(eq(todosTable.userId, userId));
}
