import { PUBLIC_API_URL } from "$env/static/public";
import type { ApiRoutes } from "@hono-starter/backend/api";
import { hc } from "hono/client";

export type ApiFetch = typeof globalThis.fetch;

export function createApiClient(customFetch?: ApiFetch) {
  return hc<ApiRoutes>(PUBLIC_API_URL, {
    fetch: customFetch,
  });
}

export type ApiClient = ReturnType<typeof createApiClient>;
