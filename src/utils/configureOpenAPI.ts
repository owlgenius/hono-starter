import type { AppOpenAPI } from "@/types/hono.js";
import { swaggerUI } from "@hono/swagger-ui";
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Todos API",
      version: "1.0.0",
    },
  });

  app.get(
    "/scalar",
    Scalar({
      url: "/doc",
      theme: "elysiajs",
      defaultHttpClient: { targetKey: "javascript", clientKey: "fetch" },
    }),
  );

  app.get("/ui", swaggerUI({ url: "/doc" }));
}
