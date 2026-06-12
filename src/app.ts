import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import pino from "pino";
import { HTTPException } from "hono/http-exception";
import routes from "./routes.js";
import type { AppEnv } from "./types/hono.js";
import {
  AppError,
  ERROR_CODES,
  ERROR_MESSAGES,
  ValidationError,
} from "./utils/errors.js";
import { log } from "./utils/logger.js";
import { structuredLogger } from "@hono/structured-logger";
import { requestId } from "hono/request-id";
import env from "../env.js";

const rootLogger = pino({
  ...(env.NODE_ENV === "production"
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          level: "debug",
        },
      }),
});

export const app = new OpenAPIHono<AppEnv>();

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

app.use(requestId());
app.use(
  structuredLogger({
    createLogger: (c) => rootLogger.child({ requestId: c.var.requestId }),
  }),
);

const codeByStatus: Record<number, string> = {
  400: ERROR_CODES.BAD_REQUEST,
  401: ERROR_CODES.UNAUTHORIZED,
  403: ERROR_CODES.FORBIDDEN,
  404: ERROR_CODES.NOT_FOUND,
  409: ERROR_CODES.CONFLICT,
  422: ERROR_CODES.UNPROCESSABLE_ENTITY,
  429: ERROR_CODES.TOO_MANY_REQUESTS,
  500: ERROR_CODES.INTERNAL_SERVER_ERROR,
};

app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: {
        code: codeByStatus[404],
        message: `${c.req.path} not found`,
      },
    },
    404,
  );
});

app.onError((error, c) => {
  if (error instanceof AppError) {
    log.http(error.statusCode, error.message, error);

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
    log.http(error.status, error.message, error);

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

  log.error("Unexpected request error", error);

  return c.json(
    {
      success: false,
      error: {
        code: codeByStatus[500],
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      },
    },
    500,
  );
});

app.route("/api", routes);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "Todos API",
    version: "1.0.0",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));
