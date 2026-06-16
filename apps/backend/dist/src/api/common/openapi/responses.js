import { BadRequestErrorResponseSchema, InternalServerErrorResponseSchema, NotFoundErrorResponseSchema, UnauthorizedErrorResponseSchema, ValidationErrorResponseSchema, } from "../schemas/response.schema.js";
import { ERROR_MESSAGES } from "#src/utils/errors";
export const badRequestErrorResponse = {
    description: ERROR_MESSAGES.BAD_REQUEST,
    content: {
        "application/json": {
            schema: BadRequestErrorResponseSchema,
        },
    },
};
export const unauthorizedResponse = {
    description: ERROR_MESSAGES.UNAUTHORIZED,
    content: {
        "application/json": {
            schema: UnauthorizedErrorResponseSchema,
        },
    },
};
export const validationErrorResponse = {
    description: ERROR_MESSAGES.VALIDATION_ERROR,
    content: {
        "application/json": {
            schema: ValidationErrorResponseSchema,
        },
    },
};
export const internalServerErrorResponse = {
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    content: {
        "application/json": {
            schema: InternalServerErrorResponseSchema,
        },
    },
};
export const notFoundResponse = (entity) => ({
    description: `${entity} not found`,
    content: {
        "application/json": {
            schema: NotFoundErrorResponseSchema(entity),
        },
    },
});
