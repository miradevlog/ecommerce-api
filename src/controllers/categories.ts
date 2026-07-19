import type { RequestHandler } from "express";

import { AppError } from "../middleware";
import { Category } from "../models";
import type { CreateCategoryBody, UpdateCategoryBody } from "../schemas";

export const getCategories: RequestHandler = async (_request, response) => {
  const categories = await Category.find();

  response.status(200).json({ data: categories });
};

export const createCategory: RequestHandler = async (request, response) => {
  const { name } = request.body as CreateCategoryBody;

  const category = await Category.create({ name });

  response.status(201).json({ data: category });
};

export const getCategoryById: RequestHandler = async (request, response) => {
  const category = await Category.findById(request.params.id);

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  response.status(200).json({ data: category });
};

export const updateCategory: RequestHandler = async (request, response) => {
  const body = request.body as UpdateCategoryBody;

  const category = await Category.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  response.status(200).json({ data: category });
};

export const deleteCategory: RequestHandler = async (request, response) => {
  const category = await Category.findByIdAndDelete(request.params.id);

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  response.status(204).send();
};
