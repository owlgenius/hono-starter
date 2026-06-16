import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, setError, superValidate } from "sveltekit-superforms/server";
import { zod4 } from "sveltekit-superforms/adapters";
import { ApiError } from "$lib/api/errors.js";
import { createTodo, getTodos } from "$lib/features/todos/api.js";
import { todoCreateFormSchema } from "$lib/features/todos/schemas.js";

const todoCreateFormAdapter = zod4(todoCreateFormSchema);

function getFieldError(fields: unknown, field: string) {
  if (typeof fields !== "object" || fields === null || !(field in fields)) {
    return undefined;
  }

  const value = (fields as Record<string, unknown>)[field];

  return typeof value === "string" ? value : undefined;
}

export const load: PageServerLoad = async ({ fetch }) => {
  const form = await superValidate(todoCreateFormAdapter);

  try {
    const todos = await getTodos(fetch);

    return {
      todos,
      form,
      loadError: undefined,
    };
  } catch (err) {
    if (err instanceof ApiError) {
      console.error("Failed to load todos from API", err);

      return {
        todos: [],
        form,
        loadError: err.message,
      };
    }

    console.error("Unexpected error while loading todos", err);

    return {
      todos: [],
      form,
      loadError: "Unable to load todos.",
    };
  }
};

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    const form = await superValidate(request, todoCreateFormAdapter);

    if (!form.valid) {
      return fail(422, {
        form,
      });
    }

    try {
      await createTodo(fetch, form.data);

      return message(form, "Todo created successfully.");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400 || err.status === 422) {
          const status = err.status === 400 ? 400 : 422;
          const titleError = getFieldError(err.fields, "title");
          const completedError = getFieldError(err.fields, "completed");

          if (titleError) {
            return setError(form, "title", titleError, { status });
          }

          if (completedError) {
            return setError(form, "completed", completedError, { status });
          }

          return setError(form, "", err.message, { status });
        }

        console.error("Failed to create todo from API", err);
        error(err.status, err.message);
      }

      console.error("Unexpected error while creating todo", err);
      error(500, "Unable to create todo.");
    }
  },
};
