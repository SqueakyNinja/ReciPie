import express from "express";
import { Recipe } from "../../../common";

import { selectAllRecipes } from "../models/allRecipes.model";
// import { UserResponse } from '../../common/api-schema';

export const getAllRecipes: express.RequestHandler<
  {},
  { recipes: Recipe[] }
> = async (req, res) => {
  const recipes = await selectAllRecipes();

  res.send({ recipes });
};
