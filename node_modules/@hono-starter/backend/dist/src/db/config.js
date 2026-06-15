import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { log } from "../utils/logger.js";
import { relations } from "./schema.js";
import env from "../../env.js";
export let db;
export async function setupDatabase() {
    if (db) {
        return db;
    }
    if (!env.DB_FILE_NAME) {
        throw new Error("Missing DB_FILE_NAME environment variable");
    }
    const client = createClient({
        url: env.DB_FILE_NAME,
    });
    const database = drizzle({ client, relations });
    await client.execute("select 1");
    db = database;
    log.database("Connected successfully");
    return db;
}
export function getDatabase() {
    if (!db) {
        throw new Error("Database has not been initialized. Call setupDatabase() first.");
    }
    return db;
}
