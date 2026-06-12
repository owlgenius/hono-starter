import { createSchemaFactory } from "drizzle-orm/zod";
import { z } from "@hono/zod-openapi";
import { usersTable } from "../../../db/schema.js";
const { createSelectSchema, createInsertSchema, createUpdateSchema } =
  createSchemaFactory({
    zodInstance: z,
  });
const UserIdSchema = z.number().int().positive().openapi({
  example: 1,
});
const UserNameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(100, "Name should be at most 100 chars")
  .openapi({
    example: "Vlad",
  });
const UserAgeSchema = z
  .number()
  .int("Age must be an integer")
  .min(1, "Age must be at least 1")
  .max(120, "Age must be at most 120")
  .openapi({
    example: 25,
  });
const UserEmailSchema = z
  .string()
  .trim()
  .email("Email must be valid")
  .max(255, "Email should be at most 255 chars")
  .openapi({
    example: "vlad@example.com",
  });
export const UserSchema = createSelectSchema(usersTable, {
  id: UserIdSchema,
  name: UserNameSchema,
  age: UserAgeSchema,
  email: UserEmailSchema,
}).openapi("User");
export const CreateUserBodySchema = createInsertSchema(usersTable, {
  name: UserNameSchema,
  age: UserAgeSchema,
  email: UserEmailSchema,
})
  .omit({
    id: true,
  })
  .openapi("CreateUserBody");
export const UpdateUserBodySchema = createUpdateSchema(usersTable, {
  name: UserNameSchema,
  age: UserAgeSchema,
  email: UserEmailSchema,
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
