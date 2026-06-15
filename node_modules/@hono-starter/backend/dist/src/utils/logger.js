import { theme } from "../config/chalk.theme.js";
import { INTERNAL_SERVER_ERROR } from "./http-status-codes.js";
function printErrorDetails(error, method) {
    if (!error)
        return;
    if (method === "warn") {
        console.warn(error);
        return;
    }
    console.error(error);
}
export const log = {
    success(message) {
        console.log(theme.success("✓"), message);
    },
    info(message) {
        console.log(theme.info("ℹ Info"), message);
    },
    warning(message, error, options = {}) {
        console.warn(theme.warning("⚠ Warning"), message);
        if (options.details) {
            printErrorDetails(error, "warn");
        }
    },
    error(message, error, options = { details: true }) {
        console.error(theme.error("✖ Error"), message);
        if (options.details) {
            printErrorDetails(error, "error");
        }
    },
    http(status, message, error, options = {}) {
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
    server(message) {
        console.log(theme.server("Server:"), message);
    },
    database(message) {
        console.log(theme.database("Database:"), message);
    },
};
