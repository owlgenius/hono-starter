declare const routes: import("@hono/zod-openapi").OpenAPIHono<import("./types/hono.js").AppEnv, import("hono/types").MergeSchemaPath<{
    "/": {
        $get: {
            input: {};
            output: {
                success: false;
                error: {
                    code: "INTERNAL_SERVER_ERROR";
                    message: string;
                };
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {};
            output: {
                success: true;
                data: {
                    createdAt: string;
                    updatedAt: string;
                    id: number;
                    title: string;
                    completed: boolean;
                    userId: number;
                }[];
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {};
            output: {
                success: false;
                error: {
                    code: "UNAUTHORIZED";
                    message: string;
                };
            };
            outputFormat: "json";
            status: 401;
        };
    };
} & {
    "/": {
        $post: {
            input: {
                json: {
                    title: string;
                    completed: boolean;
                };
            };
            output: {
                success: false;
                error: {
                    code: "INTERNAL_SERVER_ERROR";
                    message: string;
                };
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    title: string;
                    completed: boolean;
                };
            };
            output: {
                success: false;
                error: {
                    code: "UNAUTHORIZED";
                    message: string;
                };
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                json: {
                    title: string;
                    completed: boolean;
                };
            };
            output: {
                success: false;
                error: {
                    code: "BAD_REQUEST";
                    message: string;
                };
            };
            outputFormat: "json";
            status: 400;
        } | {
            input: {
                json: {
                    title: string;
                    completed: boolean;
                };
            };
            output: {
                success: true;
                data: {
                    createdAt: string;
                    updatedAt: string;
                    id: number;
                    title: string;
                    completed: boolean;
                    userId: number;
                };
            };
            outputFormat: "json";
            status: 201;
        } | {
            input: {
                json: {
                    title: string;
                    completed: boolean;
                };
            };
            output: {
                success: false;
                error: {
                    code: "VALIDATION_ERROR";
                    message: string;
                    fields: {
                        [x: string]: string;
                    };
                };
            };
            outputFormat: "json";
            status: 422;
        };
    };
} & {
    "/:todoId": {
        $put: {
            input: {
                param: {
                    todoId: unknown;
                };
            } & {
                json: {
                    title?: string | undefined;
                    completed?: boolean | undefined;
                };
            };
            output: {
                success: false;
                error: {
                    code: "INTERNAL_SERVER_ERROR";
                    message: string;
                };
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    todoId: unknown;
                };
            } & {
                json: {
                    title?: string | undefined;
                    completed?: boolean | undefined;
                };
            };
            output: {
                success: false;
                error: {
                    code: "UNAUTHORIZED";
                    message: string;
                };
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    todoId: unknown;
                };
            } & {
                json: {
                    title?: string | undefined;
                    completed?: boolean | undefined;
                };
            };
            output: {
                success: false;
                error: {
                    code: "BAD_REQUEST";
                    message: string;
                };
            };
            outputFormat: "json";
            status: 400;
        } | {
            input: {
                param: {
                    todoId: unknown;
                };
            } & {
                json: {
                    title?: string | undefined;
                    completed?: boolean | undefined;
                };
            };
            output: {
                success: false;
                error: {
                    code: "VALIDATION_ERROR";
                    message: string;
                    fields: {
                        [x: string]: string;
                    };
                };
            };
            outputFormat: "json";
            status: 422;
        } | {
            input: {
                param: {
                    todoId: unknown;
                };
            } & {
                json: {
                    title?: string | undefined;
                    completed?: boolean | undefined;
                };
            };
            output: {
                success: false;
                error: {
                    code: "NOT_FOUND";
                    message: string;
                };
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    todoId: unknown;
                };
            } & {
                json: {
                    title?: string | undefined;
                    completed?: boolean | undefined;
                };
            };
            output: {
                success: true;
                data: {
                    createdAt: string;
                    updatedAt: string;
                    id: number;
                    title: string;
                    completed: boolean;
                    userId: number;
                };
            };
            outputFormat: "json";
            status: 200;
        };
    };
}, "/todos"> & {
    "/health": {
        $get: {
            input: {};
            output: {
                success: true;
                status: "ok";
            };
            outputFormat: "json";
            status: 200;
        };
    };
}, "/">;
export type ApiRoutes = typeof routes;
export default routes;
