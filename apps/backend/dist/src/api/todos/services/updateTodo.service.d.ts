import type { TodoIdParams, UpdateTodoBody } from "../schemas/todos.schema.js";
type UpdateTodoInput = UpdateTodoBody & {
    id: TodoIdParams["todoId"];
    userId: number;
};
export declare function updateTodoService(input: UpdateTodoInput): Promise<{
    userId: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    completed: boolean;
}>;
export {};
