import db from "../db/connection";

export const selectUser = async (user_id: string) => {
  const users = await db("users")
    .select("username", "id", "email")
    .where("id", user_id);
  return users[0];
};
