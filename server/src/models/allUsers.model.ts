import db from "../db/connection";

export const selectAllUsers = async () => {
  const users = await db("users").select("username", "id", "email");

  return users;
};
