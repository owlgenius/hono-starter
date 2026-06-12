import { createSchemaFactory } from "drizzle-orm/zod";
import { z } from "@hono/zod-openapi";
import { todosTable } from "../../../db/schema.js";
const { createSelectSchema, createInsertSchema, createUpdateSchema } = createSchemaFactory({
    zodInstance: z,
});
const TodoIdSchema = z.number().int().positive().openapi({
    example: 1,
});
const TodoTitleSchema = z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150, "Title should be at most 150 chars")
    .openapi({
    example: "Learn Hono",
});
const TodoCompletedResponseSchema = z
    .number()
    .int()
    .min(0, "Completed must be 0 or 1")
    .max(1, "Completed must be 0 or 1")
    .openapi({
    example: 0,
    description: "0 for false, 1 for true",
});
const TodoCompletedInputSchema = z
    .union([z.literal(0), z.literal(1)])
    .openapi({
    example: 0,
    description: "0 for false, 1 for true",
});
const TodoUserIdSchema = z.number().int().positive().openapi({
    example: 1,
});
export const TodoSchema = createSelectSchema(todosTable, {
    id: TodoIdSchema,
    title: TodoTitleSchema,
    completed: TodoCompletedResponseSchema,
    userId: TodoUserIdSchema,
}).openapi("Todo");
export const CreateTodoBodySchema = createInsertSchema(todosTable, {
    title: TodoTitleSchema,
})
    .omit({
    id: true,
    userId: true,
    completed: true,
})
    .extend({
    completed: TodoCompletedInputSchema.optional(),
})
    .openapi("CreateTodoBody");
export const UpdateTodoBodySchema = createUpdateSchema(todosTable, {
    title: TodoTitleSchema,
})
    .omit({
    id: true,
    userId: true,
    completed: true,
})
    .extend({
    completed: TodoCompletedInputSchema.optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
})
    .openapi("UpdateTodoBody");
export const TodoIdParamsSchema = z
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
