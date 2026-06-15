import env from "../../env.js";
import pino from "pino";

export const rootLogger = pino({
  level: env.LOG_LEVEL,
  ...(env.NODE_ENV === "production"
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss.l",
          },
        },
      }),
});
