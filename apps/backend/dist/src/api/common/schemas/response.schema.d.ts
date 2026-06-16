import { z } from "@hono/zod-openapi";
export declare const BadRequestErrorResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodLiteral<"BAD_REQUEST">;
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const ValidationErrorResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodLiteral<"VALIDATION_ERROR">;
        message: z.ZodString;
        fields: z.ZodRecord<z.ZodString, z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const UnauthorizedErrorResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodLiteral<"UNAUTHORIZED">;
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const NotFoundErrorResponseSchema: (entity: string) => z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodLiteral<"NOT_FOUND">;
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const InternalServerErrorResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodLiteral<"INTERNAL_SERVER_ERROR">;
        message: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
