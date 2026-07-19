import { z } from "zod";

const userFields = {
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters"),

  email: z.email("Invalid email address"),

  password: z.string().min(8, "Password must contain at least 8 characters"),
};

export const createUserBodySchema = z.strictObject(userFields);

export const updateUserBodySchema = createUserBodySchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field must be provided",
  });

export type CreateUserBody = z.infer<typeof createUserBodySchema>;

export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;
