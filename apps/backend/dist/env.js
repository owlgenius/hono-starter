import { z } from "zod";
import { log } from "@/utils/logger.js";
const logLevels = [
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
];
const EnvSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    LOG_LEVEL: z.enum(logLevels).default("debug"),
    DB_FILE_NAME: z.string().default("file:local.db"),
    PORT: z.coerce.number().default(3001),
});
let env;
try {
    env = EnvSchema.parse(process.env);
}
catch (error) {
    log.error("Invalid environment variables", error);
    process.exit(1);
}
export default env;
