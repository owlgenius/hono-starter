import type { ZodError } from "zod/v4";

export function formatZodErrors(error: ZodError): Record<string, string> {
  const fields: Record<string, string> = {};

  for (const issue of error.issues) {
    const field =
      issue.path.length > 0 ? issue.path.map(String).join(".") : "root";

    if (!fields[field]) {
      fields[field] = issue.message;
    }
  }

  return fields;
}
