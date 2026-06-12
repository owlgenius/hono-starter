import {
  InternalServerErrorResponseSchema,
  NotFoundErrorResponseSchema,
  UnauthorizedErrorResponseSchema,
  ValidationErrorResponseSchema,
} from "../schemas/response.schema.js";
import { ERROR_MESSAGES } from "../../../utils/errors.js";

export const validationErrorResponse = {
  description: ERROR_MESSAGES.VALIDATION_ERROR,
  content: {
    "application/json": {
      schema: ValidationErrorResponseSchema,
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

export const internalServerErrorResponse = {
  description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  content: {
    "application/json": {
      schema: InternalServerErrorResponseSchema,
    },
  },
};

export const notFoundResponse = (entity: string) => ({
  description: `${entity} not found`,
  content: {
    "application/json": {
      schema: NotFoundErrorResponseSchema(entity),
    },
  },
});
