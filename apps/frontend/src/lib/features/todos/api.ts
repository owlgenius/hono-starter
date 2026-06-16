import type { InferRequestType, InferResponseType } from "hono/client";
import {
  createApiClient,
  type ApiClient,
  type ApiFetch,
} from "$lib/api/client.js";
import { unwrapApiData } from "$lib/api/response.js";

type GetTodosEndpoint = ApiClient["todos"]["$get"];
type CreateTodoEndpoint = ApiClient["todos"]["$post"];

type GetTodosResponse = InferResponseType<GetTodosEndpoint, 200>;
type CreateTodoResponse = InferResponseType<CreateTodoEndpoint, 201>;

export type Todo = GetTodosResponse["data"][number];
export type CreateTodoInput = InferRequestType<CreateTodoEndpoint>["json"];

export async function getTodos(fetch: ApiFetch): Promise<Todo[]> {
  const api = createApiClient(fetch);
  const response = await api.todos.$get();

  return unwrapApiData<GetTodosResponse["data"]>(response);
}

export async function createTodo(
  fetch: ApiFetch,
  input: CreateTodoInput,
): Promise<Todo> {
  const api = createApiClient(fetch);
  const response = await api.todos.$post({
    json: input,
  });

  return unwrapApiData<CreateTodoResponse["data"]>(response);
}
