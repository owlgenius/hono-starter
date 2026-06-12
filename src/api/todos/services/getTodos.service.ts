import {getTodosByUserId} from "../queries/getTodosByUserId.query.js";

type GetTodosInput = {
  userId: number;
};

export async function getTodosService(input: GetTodosInput) {
  return getTodosByUserId(input.userId);
}
