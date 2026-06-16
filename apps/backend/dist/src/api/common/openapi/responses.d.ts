export declare const badRequestErrorResponse: {
    description: "Bad Request";
    content: {
        "application/json": {
            schema: import("zod").ZodObject<{
                success: import("zod").ZodLiteral<false>;
                error: import("zod").ZodObject<{
                    code: import("zod").ZodLiteral<"BAD_REQUEST">;
                    message: import("zod").ZodString;
                }, import("zod/v4/core").$strip>;
            }, import("zod/v4/core").$strip>;
        };
    };
};
export declare const unauthorizedResponse: {
    description: "Unauthorized";
    content: {
        "application/json": {
            schema: import("zod").ZodObject<{
                success: import("zod").ZodLiteral<false>;
                error: import("zod").ZodObject<{
                    code: import("zod").ZodLiteral<"UNAUTHORIZED">;
                    message: import("zod").ZodString;
                }, import("zod/v4/core").$strip>;
            }, import("zod/v4/core").$strip>;
        };
    };
};
export declare const validationErrorResponse: {
    description: "Validation failed";
    content: {
        "application/json": {
            schema: import("zod").ZodObject<{
                success: import("zod").ZodLiteral<false>;
                error: import("zod").ZodObject<{
                    code: import("zod").ZodLiteral<"VALIDATION_ERROR">;
                    message: import("zod").ZodString;
                    fields: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
                }, import("zod/v4/core").$strip>;
            }, import("zod/v4/core").$strip>;
        };
    };
};
export declare const internalServerErrorResponse: {
    description: "Internal Server Error";
    content: {
        "application/json": {
            schema: import("zod").ZodObject<{
                success: import("zod").ZodLiteral<false>;
                error: import("zod").ZodObject<{
                    code: import("zod").ZodLiteral<"INTERNAL_SERVER_ERROR">;
                    message: import("zod").ZodString;
                }, import("zod/v4/core").$strip>;
            }, import("zod/v4/core").$strip>;
        };
    };
};
export declare const notFoundResponse: (entity: string) => {
    description: string;
    content: {
        "application/json": {
            schema: import("zod").ZodObject<{
                success: import("zod").ZodLiteral<false>;
                error: import("zod").ZodObject<{
                    code: import("zod").ZodLiteral<"NOT_FOUND">;
                    message: import("zod").ZodString;
                }, import("zod/v4/core").$strip>;
            }, import("zod/v4/core").$strip>;
        };
    };
};
