import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppEnv } from "../types/hono.js";
import { ValidationError } from "./errors.js";
import { formatZodErrors } from "./formatZodErrors.js";

export function createAppRouter() {
  return new OpenAPIHono<AppEnv>({
    defaultHook: (result) => {
      if (!result.success) {
        throw new ValidationError(formatZodErrors(result.error));
      }
    },
  });
}
