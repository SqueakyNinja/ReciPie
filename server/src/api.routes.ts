import express from "express";
import {
  addNewRecipe,
  allIngredients,
  getRecipes,
  postFavourite,
  getFavourite,
  postNewUrl,
} from "./recipes/recipes.controller";

import { getAllUsers, getUserById, loginUser, newUser, removeUser, updateUser } from "./users/users.controllers";

const apiRouter = express.Router();

apiRouter.route("/users/:user_id").get(getUserById).put(updateUser).delete(removeUser);

apiRouter.route("/users").get(getAllUsers).post(newUser);

apiRouter.post("/users/login", loginUser);

apiRouter.get("/recipes", getRecipes);

apiRouter.post("/recipes/:recipeId", postNewUrl);

apiRouter.post("/recipes/add", addNewRecipe);

apiRouter.route("/recipes/favourite").post(postFavourite).get(getFavourite);

apiRouter.get("/ingredients", allIngredients);

export default apiRouter;
