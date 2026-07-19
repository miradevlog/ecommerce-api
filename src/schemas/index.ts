export { idParamsSchema, objectIdSchema } from "./common";
export type { IdParams } from "./common";

export {
  createCategoryBodySchema,
  updateCategoryBodySchema,
} from "./categories";
export type { CreateCategoryBody, UpdateCategoryBody } from "./categories";

export { createOrderBodySchema, updateOrderBodySchema } from "./orders";
export type { CreateOrderBody, UpdateOrderBody } from "./orders";

export {
  createProductBodySchema,
  productQuerySchema,
  updateProductBodySchema,
} from "./products";
export type {
  CreateProductBody,
  ProductQuery,
  UpdateProductBody,
} from "./products";

export { createUserBodySchema, updateUserBodySchema } from "./users";
export type { CreateUserBody, UpdateUserBody } from "./users";
