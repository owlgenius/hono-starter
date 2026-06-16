import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppEnv } from "../types/hono.js";
export declare function createAppRouter(): OpenAPIHono<AppEnv, {}, "/">;
