import { ApiError } from "./errors.js";

type ApiSuccessEnvelope<T> = {
  success: true;
  data: T;
};

type ApiErrorEnvelope = {
  success: false;
  error: {
    code?: string;
    message?: string;
    fields?: unknown;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiSuccessEnvelope<T>(
  value: unknown,
): value is ApiSuccessEnvelope<T> {
  return isRecord(value) && value.success === true && "data" in value;
}

function isApiErrorEnvelope(value: unknown): value is ApiErrorEnvelope {
  if (!isRecord(value) || value.success !== false || !isRecord(value.error)) {
    return false;
  }

  return true;
}

async function parseJsonSafely(response: Response) {
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    return undefined;
  }

  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

export async function unwrapApiData<T>(response: Response): Promise<T> {
  const payload = await parseJsonSafely(response);

  if (!response.ok) {
    if (isApiErrorEnvelope(payload)) {
      throw new ApiError({
        status: response.status,
        code: payload.error.code,
        message: payload.error.message ?? response.statusText,
        fields: payload.error.fields,
        payload,
      });
    }

    throw new ApiError({
      status: response.status,
      message: response.statusText || "Request failed",
      payload,
    });
  }

  if (isApiSuccessEnvelope<T>(payload)) {
    return payload.data;
  }

  throw new ApiError({
    status: response.status,
    code: "INVALID_API_RESPONSE",
    message: "The API returned an unexpected response.",
    payload,
  });
}
