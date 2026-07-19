import { z } from "zod";

export const createCategoryBodySchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name must not exceed 100 characters"),
});

export const updateCategoryBodySchema = createCategoryBodySchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field must be provided",
  });

export type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>;

export type UpdateCategoryBody = z.infer<typeof updateCategoryBodySchema>;
