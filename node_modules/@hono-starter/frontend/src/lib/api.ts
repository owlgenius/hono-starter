import { hc } from "hono/client";
import { PUBLIC_API_URL } from "$env/static/public";
import type { ApiRoutes } from "@hono-starter/backend/api";

export const api = hc<ApiRoutes>(PUBLIC_API_URL);
const res = await api.todos.$post({
  json: {
    title: "",
    completed: false,
  },
});
if (res.ok) {
  const newTodo = await res.json();
}
const updatedTodo = await api.todos[":todoId"].$put({
  param: { todoId: "1" },
  json: { title: "Updated" },
});
