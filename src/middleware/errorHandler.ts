import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const notFoundHandler: RequestHandler = (request, _response, next) => {
  const message = `Route ${request.method} ${request.originalUrl} not found`;

  next(new AppError(404, message));
};

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  if (error instanceof ZodError) {
    const details = error.issues.map((issue) => ({
      path: issue.path.map(String).join("."),
      message: issue.message,
    }));

    response.status(400).json({
      error: {
        message: "Validation failed",
        details,
      },
    });

    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });

    return;
  }

  console.error(error);

  response.status(500).json({
    error: {
      message: "Internal server error",
    },
  });
};
