type GetTodosInput = {
    userId: number;
};
export declare function getTodosService(input: GetTodosInput): Promise<{
    createdAt: Date;
    updatedAt: Date;
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}[]>;
export {};
