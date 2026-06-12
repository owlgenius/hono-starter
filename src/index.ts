import "dotenv/config";
import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { setupDatabase } from "./db/config.js";
import { log } from "./utils/logger.js";
import env from "../env.js";

try {
  await setupDatabase();

  const port = Number(env.PORT ?? 3001);

  const server = serve(
    {
      fetch: app.fetch,
      port,
    },
    () => {
      log.server(`Running on http://localhost:${port}`);
      log.server(`OpenAPI docs available at http://localhost:${port}/ui`);
    },
  );

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      log.error(`Port ${port} is already in use`, undefined, {
        details: false,
      });
    } else {
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
} catch (error) {
  log.error("Failed to start server", error);
  process.exit(1);
}
