import express from "express";
import { LoginRequest, User } from "../../../common";
import {
  deleteUser,
  selectAllUsers,
  selectUser,
  tryNewUser,
  userToLogin,
  userToUpdate,
} from "./users.model";

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
  try {
    const reqNewUser = await tryNewUser(req.body.user);
    res.status(201).send({ reqNewUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
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

export const loginUser: express.RequestHandler<
  {},
  {},
  { user: LoginRequest }
> = async (req, res) => {
  try {
    const loginResponse = await userToLogin(req.body.user);

    res.status(200).send(loginResponse);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
