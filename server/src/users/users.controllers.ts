import express from "express";
import { User } from "../../../common";
import {
  addNewUser,
  deleteUser,
  selectAllUsers,
  selectUser,
  userToUpdate,
} from "./users.model";

// import { UserResponse } from '../../common/api-schema';

export const getUserById: express.RequestHandler<{ user_id: string }> = async (
  req,
  res
) => {
  const { user_id } = req.params;
  const user = await selectUser(user_id);

  res.send({ user });
};

export const getAllUsers: express.RequestHandler<{}> = async (req, res) => {
  const users = await selectAllUsers();

  res.send({ users });
};

export const newUser: express.RequestHandler<
  {},
  {},
  { user: Pick<User, "username" | "email" | "password"> }
> = async (req, res) => {
  const newUser = await addNewUser(req.body.user);

  res.status(201).send({ newUser });
};

export const updateUser: express.RequestHandler<
  { user_id: string },
  {},
  { user: Pick<User, "username" | "email" | "password"> }
> = async (req, res) => {
  const { user_id } = req.params;
  const user = await userToUpdate(user_id, req.body.user);

  res.send({ user });
};

export const removeUser: express.RequestHandler<{ user_id: string }> = async (
  req,
  res
) => {
  const { user_id } = req.params;
  const user = await deleteUser(user_id);

  res.sendStatus(204);
};
