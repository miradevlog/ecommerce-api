import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers";
import { validate } from "../middleware";
import {
  createCategoryBodySchema,
  idParamsSchema,
  updateCategoryBodySchema,
} from "../schemas";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);

categoryRouter.post(
  "/",
  validate({ body: createCategoryBodySchema }),
  createCategory,
);

categoryRouter.get(
  "/:id",
  validate({ params: idParamsSchema }),
  getCategoryById,
);

categoryRouter.put(
  "/:id",
  validate({
    params: idParamsSchema,
    body: updateCategoryBodySchema,
  }),
  updateCategory,
);

categoryRouter.delete(
  "/:id",
  validate({ params: idParamsSchema }),
  deleteCategory,
);

export default categoryRouter;
