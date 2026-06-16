export type ApiErrorOptions = {
  status: number;
  code?: string;
  message: string;
  fields?: unknown;
  payload?: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields?: unknown;
  readonly payload?: unknown;

  constructor(options: ApiErrorOptions) {
    super(options.message);

    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code ?? "API_ERROR";
    this.fields = options.fields;
    this.payload = options.payload;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
