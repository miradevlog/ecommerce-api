import { z } from "zod";

import { objectIdSchema } from "./common";

const orderProductSchema = z.strictObject({
  productId: objectIdSchema,
  quantity: z.number().int().min(1),
});

export const createOrderBodySchema = z.strictObject({
  userId: objectIdSchema,
  products: z.array(orderProductSchema).min(1),
});

export const updateOrderBodySchema = createOrderBodySchema
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field must be provided",
  });

export type CreateOrderBody = z.infer<typeof createOrderBodySchema>;
export type UpdateOrderBody = z.infer<typeof updateOrderBodySchema>;
