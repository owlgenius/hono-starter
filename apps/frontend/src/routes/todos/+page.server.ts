import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ApiError } from "$lib/api/errors.js";
import { getTodos } from "$lib/features/todos/api.js";

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const todos = await getTodos(fetch);

    return {
      todos,
    };
  } catch (err) {
    if (err instanceof ApiError) {
      error(err.status, err.message);
    }

    error(500, "Unable to load todos.");
  }
};
