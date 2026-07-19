import type { RequestHandler } from "express";

import { AppError } from "../middleware";
import { User } from "../models";
import type { CreateUserBody, UpdateUserBody } from "../schemas";

export const getUsers: RequestHandler = async (_request, response) => {
  const users = await User.find();

  response.status(200).json({ data: users });
};

export const createUser: RequestHandler = async (request, response) => {
  const { name, email, password } = request.body as CreateUserBody;

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new AppError(409, "Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  response.status(201).json({ data: user });
};

export const getUserById: RequestHandler = async (request, response) => {
  const user = await User.findById(request.params.id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  response.status(200).json({ data: user });
};

export const updateUser: RequestHandler = async (request, response) => {
  const body = request.body as UpdateUserBody;
  const user = await User.findById(request.params.id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (body.email) {
    const existingUser = await User.exists({
      email: body.email.toLowerCase(),
      _id: { $ne: user._id },
    });

    if (existingUser) {
      throw new AppError(409, "Email already exists");
    }

    user.email = body.email;
  }

  if (body.name !== undefined) {
    user.name = body.name;
  }

  if (body.password !== undefined) {
    user.password = body.password;
  }

  await user.save();

  response.status(200).json({ data: user });
};

export const deleteUser: RequestHandler = async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  response.status(204).send();
};
