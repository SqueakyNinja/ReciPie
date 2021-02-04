import express from "express";
import { selectUser } from "../models/users.model";
// import { UserResponse } from '../../common/api-schema';

export const getUserById: express.RequestHandler<
  { user_id: string },
  any
> = async (req, res) => {
  const { user_id } = req.params;
  const user = await selectUser(user_id);

  res.send({ user });
};
