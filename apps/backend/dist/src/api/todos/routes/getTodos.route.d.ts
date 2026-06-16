export declare const getTodosRoute: {
    method: "get";
    path: "/";
    tags: string[];
    security: {
        Bearer: never[];
    }[];
    summary: string;
    responses: {
        200: {
            description: string;
            content: {
                "application/json": {
                    schema: import("zod").ZodObject<{
                        success: import("zod").ZodLiteral<true>;
                        data: import("zod").ZodArray<import("drizzle-orm/zod").BuildSchema<"select", {
                            createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
                                name: string;
                                tableName: "todos";
                                dataType: "object date";
                                data: Date;
                                driverParam: number;
                                notNull: true;
                                hasDefault: true;
                                isPrimaryKey: false;
                                isAutoincrement: false;
                                hasRuntimeDefault: true;
                                enumValues: undefined;
                                baseColumn: never;
                                identity: undefined;
                                generated: undefined;
                            }, {}>;
                            updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
                                name: string;
                                tableName: "todos";
                                dataType: "object date";
                                data: Date;
                                driverParam: number;
                                notNull: true;
                                hasDefault: true;
                                isPrimaryKey: false;
                                isAutoincrement: false;
                                hasRuntimeDefault: true;
                                enumValues: undefined;
                                baseColumn: never;
                                identity: undefined;
                                generated: undefined;
                            }, {}>;
                            id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
                                name: string;
                                tableName: "todos";
                                dataType: "number int53";
                                data: number;
                                driverParam: number;
                                notNull: true;
                                hasDefault: true;
                                isPrimaryKey: true;
                                isAutoincrement: false;
                                hasRuntimeDefault: false;
                                enumValues: undefined;
                                baseColumn: never;
                                identity: undefined;
                                generated: undefined;
                            }, {}>;
                            title: import("drizzle-orm/sqlite-core").SQLiteColumn<{
                                name: string;
                                tableName: "todos";
                                dataType: "string";
                                data: string;
                                driverParam: string;
                                notNull: true;
                                hasDefault: false;
                                isPrimaryKey: false;
                                isAutoincrement: false;
                                hasRuntimeDefault: false;
                                enumValues: [string, ...string[]];
                                baseColumn: never;
                                identity: undefined;
                                generated: undefined;
                            }, {}>;
                            completed: import("drizzle-orm/sqlite-core").SQLiteColumn<{
                                name: string;
                                tableName: "todos";
                                dataType: "boolean";
                                data: boolean;
                                driverParam: number;
                                notNull: true;
                                hasDefault: true;
                                isPrimaryKey: false;
                                isAutoincrement: false;
                                hasRuntimeDefault: false;
                                enumValues: undefined;
                                baseColumn: never;
                                identity: undefined;
                                generated: undefined;
                            }, {}>;
                            userId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
                                name: string;
                                tableName: "todos";
                                dataType: "number int53";
                                data: number;
                                driverParam: number;
                                notNull: true;
                                hasDefault: false;
                                isPrimaryKey: false;
                                isAutoincrement: false;
                                hasRuntimeDefault: false;
                                enumValues: undefined;
                                baseColumn: never;
                                identity: undefined;
                                generated: undefined;
                            }, {}>;
                        }, {
                            id: (schema: import("zod").ZodNumber) => import("zod").ZodNumber;
                            title: (schema: import("zod").ZodString) => import("zod").ZodString;
                            completed: (schema: import("zod").ZodBoolean) => import("zod").ZodBoolean;
                            userId: (schema: import("zod").ZodNumber) => import("zod").ZodNumber;
                            createdAt: import("zod").ZodCoercedDate<unknown>;
                            updatedAt: import("zod").ZodCoercedDate<unknown>;
                        }, import("drizzle-orm/zod").CoerceOptions>>;
                    }, import("zod/v4/core").$strip>;
                };
            };
        };
        401: {
            description: "Unauthorized";
            content: {
                "application/json": {
                    schema: import("zod").ZodObject<{
                        success: import("zod").ZodLiteral<false>;
                        error: import("zod").ZodObject<{
                            code: import("zod").ZodLiteral<"UNAUTHORIZED">;
                            message: import("zod").ZodString;
                        }, import("zod/v4/core").$strip>;
                    }, import("zod/v4/core").$strip>;
                };
            };
        };
        500: {
            description: "Internal Server Error";
            content: {
                "application/json": {
                    schema: import("zod").ZodObject<{
                        success: import("zod").ZodLiteral<false>;
                        error: import("zod").ZodObject<{
                            code: import("zod").ZodLiteral<"INTERNAL_SERVER_ERROR">;
                            message: import("zod").ZodString;
                        }, import("zod/v4/core").$strip>;
                    }, import("zod/v4/core").$strip>;
                };
            };
        };
    };
} & {
    getRoutingPath(): "/";
};
