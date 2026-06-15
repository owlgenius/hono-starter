import routes from "./routes.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppEnv } from "@/types/hono.js";
import { structuredLogger } from "@hono/structured-logger";
import { rootLogger } from "@/utils/pino.js";
import {
  AppError,
  ERROR_CODES,
  ERROR_MESSAGES,
  ValidationError,
} from "@/utils/errors.js";
import { requestId } from "hono/request-id";
import { HTTPException } from "hono/http-exception";
import configureOpenAPI from "@/utils/configureOpenAPI.js";
import {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} from "@/utils/http-status-codes.js";

export function createApp() {
  const app = new OpenAPIHono<AppEnv>({
    strict: false,
  });

  configureOpenAPI(app);

  app.use(requestId());
  app.use(
    structuredLogger({
      createLogger: (c) =>
        rootLogger.child({
          requestId: c.var.requestId,
        }),

      onError: (logger, error) => {
        const status =
          error instanceof AppError
            ? error.statusCode
            : error instanceof HTTPException
              ? error.status
              : INTERNAL_SERVER_ERROR;

        const payload = {
          err: error,
          status,
          ...(error instanceof AppError ? { code: error.code } : {}),
        };

        if (status >= INTERNAL_SERVER_ERROR) {
          logger.error(payload, "request error");
          return;
        }

        logger.warn(payload, "request error");
      },
    }),
  );

  const codeByStatus: Record<number, string> = {
    [BAD_REQUEST]: ERROR_CODES.BAD_REQUEST,
    [UNAUTHORIZED]: ERROR_CODES.UNAUTHORIZED,
    [FORBIDDEN]: ERROR_CODES.FORBIDDEN,
    [NOT_FOUND]: ERROR_CODES.NOT_FOUND,
    [CONFLICT]: ERROR_CODES.CONFLICT,
    [UNPROCESSABLE_ENTITY]: ERROR_CODES.UNPROCESSABLE_ENTITY,
    [TOO_MANY_REQUESTS]: ERROR_CODES.TOO_MANY_REQUESTS,
    [INTERNAL_SERVER_ERROR]: ERROR_CODES.INTERNAL_SERVER_ERROR,
  };

  app.notFound((c) => {
    return c.json(
      {
        success: false,
        error: {
          code: codeByStatus[NOT_FOUND],
          message: `${c.req.path} not found`,
        },
      },
      NOT_FOUND,
    );
  });

  app.onError((error, c) => {
    if (error instanceof AppError) {
      return c.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            ...(error instanceof ValidationError && error.fields
              ? { fields: error.fields }
              : {}),
          },
        },
        error.statusCode,
      );
    }

    if (error instanceof HTTPException) {
      return c.json(
        {
          success: false,
          error: {
            code: codeByStatus[error.status] ?? ERROR_CODES.HTTP_EXCEPTION,
            message: error.message,
          },
        },
        error.status,
      );
    }

    return c.json(
      {
        success: false,
        error: {
          code: codeByStatus[INTERNAL_SERVER_ERROR],
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        },
      },
      INTERNAL_SERVER_ERROR,
    );
  });

  const appWithRoutes = app.route("/api", routes);

  return appWithRoutes;
}

export const app = createApp();
export type AppType = typeof app;
