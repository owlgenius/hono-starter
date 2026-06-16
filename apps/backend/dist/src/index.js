import "dotenv/config";
import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { setupDatabase } from "./db/config.js";
import { log } from "./utils/logger.js";
import env from "../env.js";
import { rootLogger } from "#src/utils/pino";
try {
    await setupDatabase();
    const port = Number(env.PORT ?? 3001);
    const server = serve({
        fetch: app.fetch,
        port,
    }, () => {
        log.server(`Running on http://localhost:${port}`);
        // we have 2 choices for the ui Swagger (/ui) or Scalar (/scalar)
        log.server(`OpenAPI docs available at http://localhost:${port}/ui (Swagger UI) or http://localhost:${port}/scalar (Scalar)`);
    });
    server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            rootLogger.error({
                err: error,
                port,
                code: error.code,
            }, "Port is already in use");
        }
        else {
            rootLogger.error({ err: error }, "Server error");
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
    rootLogger.error({ err: error }, "Failed to start server");
    process.exit(1);
}
