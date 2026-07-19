import { Router } from "express";

import categoryRouter from "./categoryRoutes";
import userRouter from "./userRoutes";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/categories", categoryRouter);

export default apiRouter;
