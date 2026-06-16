import type { ContentfulStatusCode } from "hono/utils/http-status";
export declare const ERROR_CODES: {
    readonly BAD_REQUEST: "BAD_REQUEST";
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly CONFLICT: "CONFLICT";
    readonly UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY";
    readonly TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
    readonly HTTP_EXCEPTION: "HTTP_EXCEPTION";
};
export declare const ERROR_MESSAGES: {
    readonly BAD_REQUEST: "Bad Request";
    readonly VALIDATION_ERROR: "Validation failed";
    readonly UNAUTHORIZED: "Unauthorized";
    readonly UNPROCESSABLE_ENTITY: "Unprocessable Entity";
    readonly NOT_FOUND: "Not Found";
    readonly CONFLICT: "Conflict";
    readonly INTERNAL_SERVER_ERROR: "Internal Server Error";
};
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
export type ErrorMessage = string;
export declare class AppError extends Error {
    statusCode: ContentfulStatusCode;
    code: ErrorCode;
    constructor(statusCode: ContentfulStatusCode, code: ErrorCode, message: ErrorMessage);
}
export declare class BadRequestError extends AppError {
    constructor(message?: ErrorMessage, code?: "BAD_REQUEST");
}
export declare class ValidationError extends AppError {
    fields: Record<string, string>;
    constructor(fields: Record<string, string>, message?: ErrorMessage, code?: "VALIDATION_ERROR");
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: ErrorMessage, code?: "UNAUTHORIZED");
}
export declare class NotFoundError extends AppError {
    constructor(message?: ErrorMessage, code?: "NOT_FOUND");
}
export declare class ConflictError extends AppError {
    constructor(message?: ErrorMessage, code?: "CONFLICT");
}
