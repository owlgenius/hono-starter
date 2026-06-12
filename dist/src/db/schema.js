import { check, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { defineRelations, sql } from "drizzle-orm";
export const usersTable = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    age: int().notNull(),
    email: text().notNull().unique(),
});
export const todosTable = sqliteTable("todos", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    completed: int().notNull(), // 0 for false, 1 for true
    // real FK column
    userId: int("user_id")
        .notNull()
        .references(() => usersTable.id),
}, (table) => [
    check("completed_check", sql `${table.completed} in (0, 1)`),
]);
export const relations = defineRelations({
    usersTable,
    todosTable,
}, (r) => ({
    usersTable: {
        todos: r.many.todosTable({
            from: r.usersTable.id,
            to: r.todosTable.userId,
        }),
    },
    todosTable: {
        user: r.one.usersTable({
            from: r.todosTable.userId,
            to: r.usersTable.id,
        }),
    },
}));
