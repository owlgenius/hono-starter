import "dotenv/config";
import { setupDatabase } from "./db/config.js";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import routes from "./routes.js";
import { HTTPException } from "hono/http-exception";
import { log } from "./utils/logger.js";
import { AppError, ValidationError } from "./utils/errors.js";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
const app = new OpenAPIHono();
app.use(logger());
const codeByStatus = {
    400: "BAD_REQUEST",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
    409: "CONFLICT",
    422: "UNPROCESSABLE_ENTITY",
    429: "TOO_MANY_REQUESTS",
    500: "INTERNAL_SERVER_ERROR",
};
app.onError((error, c) => {
    if (error instanceof AppError) {
        log.http(error.statusCode, error.message, error);
        return c.json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
                ...(error.code === "VALIDATION_ERROR" && error.fields ? { fields: error.fields } : {}),
            },
        }, error.statusCode);
    }
    if (error instanceof HTTPException) {
        log.http(error.status, error.message, error);
        return c.json({
            success: false,
            error: {
                code: codeByStatus[error.status] ?? "HTTP_EXCEPTION",
                message: error.message,
            },
        }, error.status);
    }
    log.error("Unexpected request error", error);
    return c.json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal Server Error",
        },
    }, 500);
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
try {
    await setupDatabase();
    const port = Number(process.env.PORT ?? 3001);
    const server = serve({
        fetch: app.fetch,
        port,
    }, () => {
        log.server(`Running on http://localhost:${port}`);
        log.server(`OpenAPI docs available at http://localhost:${port}/ui`);
    });
    server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            log.error(`Port ${port} is already in use`, undefined, {
                details: false,
            });
        }
        else {
            log.error("Server error", error);
        }
        process.exit(1);
    });
    const shutdown = () => {
        log.warning("Shutting down server...");
        server.close(() => {
            log.info("Server closed");
            process.exit(0);
        });
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
}
catch (error) {
    log.error("Failed to start server", error);
    process.exit(1);
}
