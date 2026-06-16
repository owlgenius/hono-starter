import { todosTable } from "../../../db/schema.js";
type TodoSelect = typeof todosTable.$inferSelect;
export declare function getTodosByUserId(userId: TodoSelect["userId"]): Promise<{
    createdAt: Date;
    updatedAt: Date;
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}[]>;
export {};
