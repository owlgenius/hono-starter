import { z } from "@hono/zod-openapi";
export const ValidationErrorResponseSchema = z
    .object({
    success: z.literal(false).openapi({ example: false }),
    error: z.object({
        code: z.literal("VALIDATION_ERROR").openapi({
            example: "VALIDATION_ERROR",
        }),
        message: z.string().openapi({
            example: "Validation failed",
        }),
        fields: z.record(z.string(), z.string()).openapi({
            example: {
                title: "Title is required",
                completed: "Completed must be 0 or 1",
            },
        }),
    }),
})
    .openapi("ValidationErrorResponse");
export const UnauthorizedErrorResponseSchema = z
    .object({
    success: z.literal(false).openapi({ example: false }),
    error: z.object({
        code: z.string().openapi({
            example: "UNAUTHORIZED",
        }),
        message: z.string().openapi({
            example: "Unauthorized",
        }),
    }),
})
    .openapi("ErrorResponse");
export const NotFoundErrorResponseSchema = (entity) => z
    .object({
    success: z.literal(false).openapi({ example: false }),
    error: z.object({
        code: z.string().openapi({
            example: "TODO_NOT_FOUND",
        }),
        message: z.string().openapi({
            example: "Todo not found",
        }),
    }),
})
    .openapi("ErrorResponse");
export const ErrorResponseSchema = z
    .object({
    success: z.literal(false).openapi({ example: false }),
    error: z.object({
        code: z.string().openapi({
            example: "INTERNAL_SERVER_ERROR",
        }),
        message: z.string().openapi({
            example: "Internal Server Error",
        }),
    }),
})
    .openapi("ErrorResponse");
