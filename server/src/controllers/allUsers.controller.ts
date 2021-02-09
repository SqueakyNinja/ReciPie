import express from "express";
import { selectAllUsers } from "../models/allUsers.model";
// import { UserResponse } from '../../common/api-schema';

export const getAllUsers = async (req: any, res: any) => {
  const users = await selectAllUsers();

  res.send({ users });
};
