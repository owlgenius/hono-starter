import { z } from "@hono/zod-openapi";
import { ERROR_CODES, ERROR_MESSAGES } from "../../../utils/errors.js";

export const ValidationErrorResponseSchema = z
  .object({
    success: z.literal(false).openapi({ example: false }),
    error: z.object({
      code: z.literal(ERROR_CODES.VALIDATION_ERROR).openapi({
        example: ERROR_CODES.VALIDATION_ERROR,
      }),
      message: z.string().openapi({
        example: ERROR_MESSAGES.VALIDATION_ERROR,
      }),
      fields: z.record(z.string(), z.string()).openapi({
        example: {
          title: "Title is required",
          completed: "Invalid input: expected boolean, received string",
        },
      }),
    }),
  })
  .openapi("ValidationErrorResponse");

export const UnauthorizedErrorResponseSchema = z
  .object({
    success: z.literal(false).openapi({ example: false }),
    error: z.object({
      code: z.literal(ERROR_CODES.UNAUTHORIZED).openapi({
        example: ERROR_CODES.UNAUTHORIZED,
      }),
      message: z.string().openapi({
        example: ERROR_MESSAGES.UNAUTHORIZED,
      }),
    }),
  })
  .openapi("UnauthorizedErrorResponse");

export const NotFoundErrorResponseSchema = (entity: string) =>
  z
    .object({
      success: z.literal(false).openapi({ example: false }),
      error: z.object({
        code: z.literal(ERROR_CODES.NOT_FOUND).openapi({
          example: ERROR_CODES.NOT_FOUND,
        }),
        message: z.string().openapi({
          example: `${entity} not found`,
        }),
      }),
    })
    .openapi(`${entity}NotFoundErrorResponse`);

export const InternalServerErrorResponseSchema = z
  .object({
    success: z.literal(false).openapi({ example: false }),
    error: z.object({
      code: z.literal(ERROR_CODES.INTERNAL_SERVER_ERROR).openapi({
        example: ERROR_CODES.INTERNAL_SERVER_ERROR,
      }),
      message: z.string().openapi({
        example: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      }),
    }),
  })
  .openapi("InternalServerErrorResponse");
