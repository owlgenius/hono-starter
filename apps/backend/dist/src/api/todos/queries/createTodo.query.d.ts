import { todosTable } from "../../../db/schema.js";
type TodoInsert = typeof todosTable.$inferInsert;
type CreateTodoData = Pick<TodoInsert, "userId" | "title" | "completed">;
export declare function createTodo(data: CreateTodoData): Promise<{
    userId: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    completed: boolean;
}>;
export {};
