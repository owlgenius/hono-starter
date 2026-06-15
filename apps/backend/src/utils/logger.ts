import { theme } from "../config/chalk.theme.js";
import { INTERNAL_SERVER_ERROR } from "./http-status-codes.js";

type LogOptions = {
  details?: boolean;
};

function printErrorDetails(error: unknown, method: "warn" | "error") {
  if (!error) return;

  if (method === "warn") {
    console.warn(error);
    return;
  }

  console.error(error);
}

export const log = {
  success(message: string) {
    console.log(theme.success("✓"), message);
  },

  info(message: string) {
    console.log(theme.info("ℹ Info"), message);
  },

  warning(message: string, error?: unknown, options: LogOptions = {}) {
    console.warn(theme.warning("⚠ Warning"), message);

    if (options.details) {
      printErrorDetails(error, "warn");
    }
  },

  error(
    message: string,
    error?: unknown,
    options: LogOptions = { details: true },
  ) {
    console.error(theme.error("✖ Error"), message);

    if (options.details) {
      printErrorDetails(error, "error");
    }
  },

  http(
    status: number,
    message: string,
    error?: unknown,
    options: LogOptions = {},
  ) {
    const shouldShowDetails = options.details ?? status >= INTERNAL_SERVER_ERROR;

    if (status >= INTERNAL_SERVER_ERROR) {
      this.error(`HTTP ${status}: ${message}`, error, {
        details: shouldShowDetails,
      });

      return;
    }

    this.warning(`HTTP ${status}: ${message}`, error, {
      details: shouldShowDetails,
    });
  },

  server(message: string) {
    console.log(theme.server("Server:"), message);
  },

  database(message: string) {
    console.log(theme.database("Database:"), message);
  },
};
