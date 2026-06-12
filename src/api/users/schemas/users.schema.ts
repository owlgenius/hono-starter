import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "../../../utils/drizzleZod.js";
import { z } from "@hono/zod-openapi";
import { usersTable } from "../../../db/schema.js";

const USER_MIN_AGE = 0;
const USER_MAX_AGE = 150;

const userNameInput = (schema: z.ZodString) =>
  schema.trim().min(1, "Name is required").openapi({ example: "Vlad" });

const userNameOutput = (schema: z.ZodString) =>
  schema.openapi({ example: "Vlad" });

const userAge = (schema: z.ZodNumber) =>
  schema
    .min(USER_MIN_AGE, `Age must be at least ${USER_MIN_AGE}`)
    .max(USER_MAX_AGE, `Age must be at most ${USER_MAX_AGE}`)
    .openapi({ example: 25 });

const userEmailInput = (schema: z.ZodString) =>
  schema.trim().email("Email must be valid").openapi({
    example: "vlad@example.com",
  });

const userEmailOutput = (schema: z.ZodString) =>
  schema.email("Email must be valid").openapi({
    example: "vlad@example.com",
  });

export const UserSchema = createSelectSchema(usersTable, {
  id: (schema: z.ZodNumber) => schema.positive().openapi({ example: 1 }),
  name: userNameOutput,
  age: userAge,
  email: userEmailOutput,
}).openapi("User");

export const CreateUserBodySchema = createInsertSchema(usersTable, {
  name: userNameInput,
  age: userAge,
  email: userEmailInput,
})
  .omit({
    id: true,
  })
  .openapi("CreateUserBody");

export const UpdateUserBodySchema = createUpdateSchema(usersTable, {
  name: userNameInput,
  age: userAge,
  email: userEmailInput,
})
  .omit({
    id: true,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .openapi("UpdateUserBody");

export const UserIdParamsSchema = z
  .object({
    userId: z.coerce
      .number()
      .int("User id must be an integer")
      .positive("User id must be positive")
      .openapi({
        param: {
          name: "userId",
          in: "path",
        },
        example: 1,
      }),
  })
  .openapi("UserIdParams");

export const UsersListResponseSchema = z
  .object({
    success: z.literal(true).openapi({ example: true }),
    data: z.array(UserSchema),
  })
  .openapi("UsersListResponse");

export const UserResponseSchema = z
  .object({
    success: z.literal(true).openapi({ example: true }),
    data: UserSchema,
  })
  .openapi("UserResponse");

export type User = z.infer<typeof UserSchema>;
export type CreateUserBody = z.infer<typeof CreateUserBodySchema>;
export type UpdateUserBody = z.infer<typeof UpdateUserBodySchema>;
export type UserIdParams = z.infer<typeof UserIdParamsSchema>;
