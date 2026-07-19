import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers";
import { validate } from "../middleware";
import {
  createUserBodySchema,
  idParamsSchema,
  updateUserBodySchema,
} from "../schemas";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.post("/", validate({ body: createUserBodySchema }), createUser);

userRouter.get("/:id", validate({ params: idParamsSchema }), getUserById);

userRouter.put(
  "/:id",
  validate({
    params: idParamsSchema,
    body: updateUserBodySchema,
  }),
  updateUser,
);

userRouter.delete("/:id", validate({ params: idParamsSchema }), deleteUser);

export default userRouter;
