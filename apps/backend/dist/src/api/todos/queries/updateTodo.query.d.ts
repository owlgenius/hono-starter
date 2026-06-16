import { todosTable } from "../../../db/schema.js";
type TodoInsert = typeof todosTable.$inferInsert;
type TodoSelect = typeof todosTable.$inferSelect;
type TodoUpdate = Partial<Pick<TodoInsert, "title" | "completed">>;
type UpdateTodoData = TodoUpdate & {
    id: TodoSelect["id"];
    userId: TodoSelect["userId"];
};
export declare function updateTodo(data: UpdateTodoData): Promise<{
    userId: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    completed: boolean;
}>;
export {};
