import { z } from "zod";

const TODO_TITLE_MAX_LENGTH = 200;

export const todoCreateFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(
      TODO_TITLE_MAX_LENGTH,
      `Title must be ${TODO_TITLE_MAX_LENGTH} characters or less.`,
    ),
  completed: z.boolean().default(false),
});

export type TodoCreateFormData = z.infer<typeof todoCreateFormSchema>;
