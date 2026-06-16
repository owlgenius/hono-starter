type LogOptions = {
    details?: boolean;
};
export declare const log: {
    success(message: string): void;
    info(message: string): void;
    warning(message: string, error?: unknown, options?: LogOptions): void;
    error(message: string, error?: unknown, options?: LogOptions): void;
    http(status: number, message: string, error?: unknown, options?: LogOptions): void;
    server(message: string): void;
    database(message: string): void;
};
export {};
