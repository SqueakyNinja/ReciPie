import express from "express";
import { Ingredients, Recipe } from "../../../common";
import { RecipesResponse } from "../../../common/responses";
import { getAllIngredients, selectRecipes, tryAddRecipe, updateFavouriteStatus } from "./recipes.model";

export const getRecipes: express.RequestHandler<
  {},
  RecipesResponse,
  {},
  { userId: string; getSavedRecipes: string; searchStr: string; recipeId: string }
> = async (req, res) => {
  const getSavedRecipes = req.query.getSavedRecipes === "true";
  try {
    const recipes = await selectRecipes(req.query.userId, getSavedRecipes, req.query.searchStr, req.query.recipeId);
    res.send({ recipes });
  } catch (error) {
    console.log(error);
  }
};

export const addNewRecipe: express.RequestHandler<{}, {}, { recipe: Recipe }> = async (req, res) => {
  try {
    const recipeId = await tryAddRecipe(req.body.recipe);
    res.status(201).send({ recipeId });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const postFavourite: express.RequestHandler<
  {},
  {},
  { userId: string; recipeId?: string; apiId?: number }
> = async (req, res) => {
  try {
    const { userId, recipeId, apiId } = req.body;
    const favouriteStatus = await updateFavouriteStatus(userId, recipeId, apiId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export const allIngredients: express.RequestHandler<{}, Ingredients[]> = async (req, res) => {
  const ingredients = await getAllIngredients();

  res.send(ingredients);
};
