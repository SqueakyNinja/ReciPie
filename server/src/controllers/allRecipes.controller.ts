import express from "express";
import { RecipesResponse } from "../../../common/responses";

import { selectAllRecipes } from "../models/allRecipes.model";
// import { UserResponse } from '../../common/api-schema';

export const getAllRecipes: express.RequestHandler<
  {},
  RecipesResponse
> = async (req, res) => {
  const recipes = await selectAllRecipes();

  res.send({ recipes });
};
