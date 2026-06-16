import { createInsertSchema, createSelectSchema, createUpdateSchema, } from "#src/utils/drizzleZod";
import { z } from "@hono/zod-openapi";
import { todosTable } from "#src/db/schema";
const todoTitleInput = (schema) => schema.trim().min(1, "Title is required").openapi({
    example: "Learn Hono",
});
const todoTitleOutput = (schema) => schema.openapi({
    example: "Learn Hono",
});
const todoCompletedInput = (schema) => schema.optional().openapi({
    example: false,
    description: "Whether the todo is completed",
});
const todoCompletedOutput = (schema) => schema.openapi({
    example: false,
    description: "Whether the todo is completed",
});
const positiveId = (schema) => schema.positive().openapi({ example: 1 });
export const TodoSchema = createSelectSchema(todosTable, {
    id: positiveId,
    title: todoTitleOutput,
    completed: todoCompletedOutput,
    userId: positiveId,
    createdAt: z.coerce.date().openapi({ example: "2024-01-01T00:00:00.000Z" }),
    updatedAt: z.coerce.date().openapi({ example: "2024-01-01T00:00:00.000Z" }),
}).openapi("Todo");
export const CreateTodoBodySchema = createInsertSchema(todosTable, {
    title: todoTitleInput,
    completed: todoCompletedInput,
})
    .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
})
    .openapi("CreateTodoBody");
export const UpdateTodoBodySchema = createUpdateSchema(todosTable, {
    title: todoTitleInput,
    completed: todoCompletedInput,
})
    .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
})
    .openapi("UpdateTodoBody");
export const UpdateTodoParamsSchema = z
    .object({
    todoId: z.coerce
        .number()
        .int("Todo id must be an integer")
        .positive("Todo id must be positive")
        .openapi({
        param: {
            name: "todoId",
            in: "path",
        },
        example: 1,
    }),
})
    .openapi("TodoIdParams");
export const TodosListResponseSchema = z
    .object({
    success: z.literal(true).openapi({ example: true }),
    data: z.array(TodoSchema),
})
    .openapi("TodosListResponse");
export const TodoResponseSchema = z
    .object({
    success: z.literal(true).openapi({ example: true }),
    data: TodoSchema,
})
    .openapi("TodoResponse");
