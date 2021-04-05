import express from "express";
import { Ingredients, Recipe } from "../../../common";
import { RecipesResponse } from "../../../common/responses";
import {
  checkFavouriteStatus,
  getAllIngredients,
  selectRecipes,
  tryAddRecipe,
  updateFavouriteStatus,
  setNewImagePath,
} from "./recipes.model";

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
    res.status(200).send({ status: favouriteStatus });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export const getFavourite: express.RequestHandler<{}, {}, {}, { userId: string; recipeId?: string }> = async (
  req,
  res
) => {
  try {
    const { userId, recipeId } = req.query;
    const favouriteStatus = await checkFavouriteStatus(userId, recipeId ?? "");
    res.status(200).send({ status: favouriteStatus });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export const allIngredients: express.RequestHandler<{}, Ingredients[]> = async (req, res) => {
  const ingredients = await getAllIngredients();

  res.send(ingredients);
};

export const postNewUrl: express.RequestHandler<{}, {}, { recipeId: string; newURL: string }> = async (req, res) => {
  try {
    const { recipeId, newURL } = req.body;
    const response = await setNewImagePath(recipeId, newURL);
    res.send(202).send(response);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
