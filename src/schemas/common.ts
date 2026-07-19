import { z } from "zod";

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

export const idParamsSchema = z.strictObject({
  id: objectIdSchema,
});

export type IdParams = z.infer<typeof idParamsSchema>;
