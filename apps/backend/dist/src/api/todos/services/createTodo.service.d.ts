import type { CreateTodoBody } from "../schemas/todos.schema.js";
type CreateTodoInput = CreateTodoBody & {
    userId: number;
};
export declare function createTodoService(input: CreateTodoInput): Promise<{
    userId: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    completed: boolean;
}>;
export {};
