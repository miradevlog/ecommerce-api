import type { RequestHandler } from "express";
import type { ZodType } from "zod";

interface RequestSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

export const validate = (schemas: RequestSchemas): RequestHandler => {
  return (request, _response, next) => {
    try {
      if (schemas.body) {
        schemas.body.parse(request.body);
      }

      if (schemas.params) {
        schemas.params.parse(request.params);
      }

      if (schemas.query) {
        schemas.query.parse(request.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
