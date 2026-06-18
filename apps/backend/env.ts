import { z } from "zod";
import type { Level } from "pino";
import { log } from "#src/utils/logger";

const logLevels = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
] as const satisfies Level[];

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  LOG_LEVEL: z.enum(logLevels).default("debug"),
  DB_FILE_NAME: z.string().default("file:local.db"),
  PORT: z.coerce.number().default(3001),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5173")
    .transform((value) =>
      value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),
});

let env: z.infer<typeof EnvSchema>;

try {
  env = EnvSchema.parse(process.env);
} catch (error) {
  log.error("Invalid environment variables", error);
  process.exit(1);
}

export default env;
