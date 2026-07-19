import { z } from "zod";

import { objectIdSchema } from "./common";

const productFields = {
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2000),
  price: z.number().nonnegative(),
  categoryId: objectIdSchema,
};

export const createProductBodySchema = z.strictObject(productFields);

export const updateProductBodySchema = createProductBodySchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field must be provided",
  });

export const productQuerySchema = z.strictObject({
  categoryId: objectIdSchema.optional(),
});

export type CreateProductBody = z.infer<typeof createProductBodySchema>;
export type UpdateProductBody = z.infer<typeof updateProductBodySchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
