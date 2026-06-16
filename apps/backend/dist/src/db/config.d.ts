import { drizzle } from "drizzle-orm/libsql";
export declare let db: ReturnType<typeof drizzle>;
export declare function setupDatabase(): Promise<import("drizzle-orm/libsql").LibSQLDatabase<Record<string, unknown>, import("drizzle-orm").TablesRelationalConfig> & {
    $client: import("@libsql/client").Client;
}>;
export declare function getDatabase(): import("drizzle-orm/libsql").LibSQLDatabase<Record<string, unknown>, import("drizzle-orm").TablesRelationalConfig> & {
    $client: import("@libsql/client").Client;
};
