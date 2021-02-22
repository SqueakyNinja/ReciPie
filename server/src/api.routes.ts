import express from "express";
import { getAllRecipes } from "./recipes/recipes.controller";

import {
  getAllUsers,
  getUserById,
  newUser,
  removeUser,
  updateUser,
} from "./users/users.controllers";

const apiRouter = express.Router();

apiRouter.get("/users/:user_id", getUserById);

apiRouter.get("/users", getAllUsers);

apiRouter.post("/users", newUser);

apiRouter.put("/users/:user_id", updateUser);

apiRouter.delete("/users/:user_id", removeUser);

apiRouter.get("/recipes", getAllRecipes);

export default apiRouter;
