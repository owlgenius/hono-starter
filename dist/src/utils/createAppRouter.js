import { OpenAPIHono } from "@hono/zod-openapi";
import { ValidationError } from "./errors.js";
import { formatZodErrors } from "./formatZodErrors.js";
export function createAppRouter() {
  return new OpenAPIHono({
    defaultHook: (result) => {
      if (!result.success) {
        throw new ValidationError(formatZodErrors(result.error));
      }
    },
  });
}
