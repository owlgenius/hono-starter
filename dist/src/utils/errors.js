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
  constructor(message = "Bad Request", code = "BAD_REQUEST") {
    super(400, code, message);
  }
}
export class ValidationError extends AppError {
  fields;
  constructor(
    fields,
    message = "Validation failed",
    code = "VALIDATION_ERROR",
  ) {
    super(400, code, message);
    this.fields = fields;
  }
}
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", code = "UNAUTHORIZED") {
    super(401, code, message);
  }
}
export class NotFoundError extends AppError {
  constructor(message = "Not Found", code = "NOT_FOUND") {
    super(404, code, message);
  }
}
export class ConflictError extends AppError {
  constructor(message = "Conflict", code = "CONFLICT") {
    super(409, code, message);
  }
}
