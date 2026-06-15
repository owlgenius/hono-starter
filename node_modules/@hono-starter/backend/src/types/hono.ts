import pino from "pino";
import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

export type AppEnv = {
  Variables: {
    logger: pino.Logger;
    userId: number;
  };
};

export type AppOpenAPI = OpenAPIHono<AppEnv>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>;
