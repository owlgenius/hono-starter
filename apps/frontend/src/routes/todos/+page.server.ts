import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { todoCreateFormSchema } from "$lib/features/todos/schemas.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(todoCreateFormSchema)),
  };
};
