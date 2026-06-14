import { BAD_REQUEST, CONFLICT, NOT_FOUND, UNAUTHORIZED, } from "@/utils/http-status-codes.js";
export const ERROR_CODES = {
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    CONFLICT: "CONFLICT",
    UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    HTTP_EXCEPTION: "HTTP_EXCEPTION",
};
export const ERROR_MESSAGES = {
    BAD_REQUEST: "Bad Request",
    VALIDATION_ERROR: "Validation failed",
    UNAUTHORIZED: "Unauthorized",
    NOT_FOUND: "Not Found",
    CONFLICT: "Conflict",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
};
export class AppError extends Error {
    statusCode;
    code;
    constructor(statusCode, code, message) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = this.constructor.name;
    }
}
export class BadRequestError extends AppError {
    constructor(message = ERROR_MESSAGES.BAD_REQUEST, code = ERROR_CODES.BAD_REQUEST) {
        super(BAD_REQUEST, code, message);
    }
}
export class ValidationError extends AppError {
    fields;
    constructor(fields, message = ERROR_MESSAGES.VALIDATION_ERROR, code = ERROR_CODES.VALIDATION_ERROR) {
        super(BAD_REQUEST, code, message);
        this.fields = fields;
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = ERROR_MESSAGES.UNAUTHORIZED, code = ERROR_CODES.UNAUTHORIZED) {
        super(UNAUTHORIZED, code, message);
    }
}
export class NotFoundError extends AppError {
    constructor(message = ERROR_MESSAGES.NOT_FOUND, code = ERROR_CODES.NOT_FOUND) {
        super(NOT_FOUND, code, message);
    }
}
export class ConflictError extends AppError {
    constructor(message = ERROR_MESSAGES.CONFLICT, code = ERROR_CODES.CONFLICT) {
        super(CONFLICT, code, message);
    }
}
