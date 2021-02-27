import { LoginRequest, NewUser, User } from "../../../common";
import db from "../db/connection";

export const selectUser = async (user_id: string) => {
  const users = await db("users")
    .select("username", "id", "email")
    .where("id", user_id);
  return users[0];
};

export const selectAllUsers = async () => {
  const users = await db("users").select("username", "id", "email");
  return users;
};

export const tryNewUser = async (user: NewUser) => {
  try {
    await db("users").insert(user);
    return "User added";
  } catch (error) {
    if (error.constraint === "users_username_key") {
      throw { message: "Username has already been taken" };
    } else if (error.constraint === "users_email_key") {
      throw { message: "Email has already been used" };
    } else {
      throw { message: "Something else went wrong" };
    }
  }
};

export const userToUpdate = async (user_id: string, user: Partial<User>) => {
  console.log(user_id);
  const newUser = await db("users").update(user).where("id", user_id).limit(1);
  return "User added";
};

export const deleteUser = async (user_id: string) => {
  const deleteUser = await db("users").delete().where("id", user_id);
  console.log(deleteUser);
  return "User deleted";
};

export const userToLogin = async (user: LoginRequest) => {
  const getUserArrayFromUsername = await db("users")
    .select("username", "password", "id")
    .where("username", user.username);
  console.log(getUserArrayFromUsername);

  if (getUserArrayFromUsername.length === 0) {
    throw { message: "No username found", loginStatus: false };
  }
  const currentUser = getUserArrayFromUsername[0];

  console.log(currentUser);
  if (currentUser.password === user.password) {
    let response = {
      user_id: currentUser.id,
      loginStatus: true,
      message: "Login Successful",
    };
    return response;
  } else {
    throw {
      loginStatus: false,
      message: "Incorrect Password",
    };
  }
};
