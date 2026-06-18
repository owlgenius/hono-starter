import type { InferRequestType, InferResponseType } from "hono/client";
import {
  createApiClient,
  type ApiClient,
  type ApiFetch,
} from "$lib/api/client.js";
import { unwrapApiData } from "$lib/api/response.js";

type GetTodosEndpoint = ApiClient["todos"]["$get"];
type CreateTodoEndpoint = ApiClient["todos"]["$post"];
type UpdateTodoEndpoint = ApiClient["todos"][":todoId"]["$put"];

type GetTodosResponse = InferResponseType<GetTodosEndpoint, 200>;
type CreateTodoResponse = InferResponseType<CreateTodoEndpoint, 201>;
type UpdateTodoResponse = InferResponseType<UpdateTodoEndpoint, 200>;

export type Todo = GetTodosResponse["data"][number];
export type CreateTodoInput = InferRequestType<CreateTodoEndpoint>["json"];
export type UpdateTodoInput = {
  todoId: Todo["id"];
  data: InferRequestType<UpdateTodoEndpoint>["json"];
};

export async function getTodos(fetch?: ApiFetch): Promise<Todo[]> {
  const api = createApiClient(fetch);
  const response = await api.todos.$get();

  return unwrapApiData<GetTodosResponse>(response);
}

export async function createTodo(
  input: CreateTodoInput,
  fetch?: ApiFetch,
): Promise<Todo> {
  const api = createApiClient(fetch);
  const response = await api.todos.$post({
    json: input,
  });

  return unwrapApiData<CreateTodoResponse>(response);
}

export async function updateTodo(
  input: UpdateTodoInput,
  fetch?: ApiFetch,
): Promise<Todo> {
  const api = createApiClient(fetch);
  const response = await api.todos[":todoId"].$put({
    param: {
      todoId: String(input.todoId),
    },
    json: input.data,
  });

  return unwrapApiData<UpdateTodoResponse>(response);
}
