import { check, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { defineRelations, sql } from "drizzle-orm";

export const usersTable = sqliteTable(
  "users",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text({ length: 100 }).notNull(),
    age: int().notNull(),
    email: text({ length: 255 }).notNull().unique(),
  },
  (table) => [
    check("users_name_not_empty_check", sql`length(trim(${table.name})) > 0`),
    check("users_name_length_check", sql`length(${table.name}) <= 100`),
    check("users_age_check", sql`${table.age} between 0 and 150`),
    check("users_email_not_empty_check", sql`length(trim(${table.email})) > 0`),
    check("users_email_length_check", sql`length(${table.email}) <= 255`),
  ],
);

export const todosTable = sqliteTable(
  "todos",
  {
    id: int().primaryKey({ autoIncrement: true }),
    title: text({ length: 200 }).notNull(),
    completed: int({ mode: "boolean" }).notNull().default(false),

    // real FK column
    userId: int("user_id")
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [
    check("todos_title_not_empty_check", sql`length(trim(${table.title})) > 0`),
    check("todos_title_length_check", sql`length(${table.title}) <= 200`),
  ],
);

export const relations = defineRelations(
  {
    usersTable,
    todosTable,
  },
  (r) => ({
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
  }),
);
