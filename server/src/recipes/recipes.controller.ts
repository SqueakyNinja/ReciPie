import express from "express";
import { Recipe } from "../../../common";
import { RecipesResponse } from "../../../common/responses";
import { selectAllRecipes, tryAddRecipe } from "./recipes.model";

export const getAllRecipes: express.RequestHandler<{}, RecipesResponse> = async (req, res) => {
  const recipes = await selectAllRecipes();

  res.send({ recipes });
};

export const addNewRecipe: express.RequestHandler<{}, {}, { recipe: Recipe }> = async (req, res) => {
  try {
    const reqNewRecipe = await tryAddRecipe(req.body.recipe);
    res.status(201).send({ reqNewRecipe });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
