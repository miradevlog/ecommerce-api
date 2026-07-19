import { Router } from "express";

import userRouter from "./userRoutes";

const apiRouter = Router();

apiRouter.use("/users", userRouter);

export default apiRouter;
