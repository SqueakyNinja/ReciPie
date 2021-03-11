import express from "express";
import { addNewRecipe, getAllRecipes } from "./recipes/recipes.controller";

import { getAllUsers, getUserById, loginUser, newUser, removeUser, updateUser } from "./users/users.controllers";

const apiRouter = express.Router();

apiRouter.get("/users/:user_id", getUserById);

apiRouter.get("/users", getAllUsers);

apiRouter.post("/users", newUser);

apiRouter.put("/users/:user_id", updateUser);

apiRouter.delete("/users/:user_id", removeUser);

apiRouter.post("/users/login", loginUser);

apiRouter.get("/recipes", getAllRecipes);

apiRouter.post("/recipes/add", addNewRecipe);

export default apiRouter;
