import type { MiddlewareHandler } from "hono";
import type {AppEnv} from "../../../types/hono.js";
import {UnauthorizedError} from "../../../utils/errors.js";

export const authMiddleware: MiddlewareHandler<AppEnv> = async (c, next) => {
  // verify JWT here
  const userId = 1;

  if (!userId) {
    throw new UnauthorizedError();
  }

  c.set("userId", userId);

  await next();
};
