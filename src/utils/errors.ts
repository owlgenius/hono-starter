import type { ContentfulStatusCode } from "hono/utils/http-status";
import {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  UNAUTHORIZED,
} from "@/utils/http-status-codes.js";

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
} as const;

export const ERROR_MESSAGES = {
  BAD_REQUEST: "Bad Request",
  VALIDATION_ERROR: "Validation failed",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Not Found",
  CONFLICT: "Conflict",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
export type ErrorMessage = string;

export class AppError extends Error {
  constructor(
    public statusCode: ContentfulStatusCode,
    public code: ErrorCode,
    message: ErrorMessage,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends AppError {
  constructor(
    message: ErrorMessage = ERROR_MESSAGES.BAD_REQUEST,
    code = ERROR_CODES.BAD_REQUEST,
  ) {
    super(BAD_REQUEST, code, message);
  }
}

export class ValidationError extends AppError {
  constructor(
    public fields: Record<string, string>,
    message: ErrorMessage = ERROR_MESSAGES.VALIDATION_ERROR,
    code = ERROR_CODES.VALIDATION_ERROR,
  ) {
    super(BAD_REQUEST, code, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message: ErrorMessage = ERROR_MESSAGES.UNAUTHORIZED,
    code = ERROR_CODES.UNAUTHORIZED,
  ) {
    super(UNAUTHORIZED, code, message);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: ErrorMessage = ERROR_MESSAGES.NOT_FOUND,
    code = ERROR_CODES.NOT_FOUND,
  ) {
    super(NOT_FOUND, code, message);
  }
}

export class ConflictError extends AppError {
  constructor(
    message: ErrorMessage = ERROR_MESSAGES.CONFLICT,
    code = ERROR_CODES.CONFLICT,
  ) {
    super(CONFLICT, code, message);
  }
}
