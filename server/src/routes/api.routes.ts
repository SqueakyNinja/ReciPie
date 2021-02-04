import express from "express";
const apiRouter = express.Router();
import { getUserById } from "../controllers/users.controllers";

apiRouter.get("/users/:user_id", getUserById);

export default apiRouter;
