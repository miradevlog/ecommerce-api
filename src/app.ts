import cors from "cors";
import express from "express";

import { errorHandler, notFoundHandler } from "./middleware";
import apiRouter from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    message: "eCommerce API is running",
  });
});

app.use(apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
