import express from "express";
import { getAllRecipes } from "../controllers/allRecipes.controller";
import { getAllUsers } from "../controllers/allUsers.controller";
import { getUserById } from "../controllers/users.controllers";

const apiRouter = express.Router();

apiRouter.get("/users/:user_id", getUserById);

apiRouter.get("/users", getAllUsers);

apiRouter.get("/recipes", getAllRecipes);

export default apiRouter;
