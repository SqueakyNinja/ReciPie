import express from "express";
import { addNewRecipe, allIngredients, allRecipes, postFavourite } from "./recipes/recipes.controller";

import { getAllUsers, getUserById, loginUser, newUser, removeUser, updateUser } from "./users/users.controllers";

const apiRouter = express.Router();

apiRouter.route("/users/:user_id").get(getUserById).put(updateUser).delete(removeUser);

apiRouter.route("/users").get(getAllUsers).post(newUser);

apiRouter.post("/users/login", loginUser);

apiRouter.get("/recipes", allRecipes);

apiRouter.post("/recipes/add", addNewRecipe);

apiRouter.post("/recipes/favourite", postFavourite);

apiRouter.get("/ingredients", allIngredients);

export default apiRouter;
