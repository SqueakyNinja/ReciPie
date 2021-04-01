import axios from "axios";
import { Recipe } from "../../../common";

axios.defaults.baseURL = "http://localhost:9090/api";
// axios.defaults.baseURL = "https://reci-pie-server.herokuapp.com/api";

export const getAllRecipes = async (filterByUserId = "", getSavedRecipes = false, searchStr = "", recipeId = "") => {
  const getAllRecipesResponse = await axios.get(
    `/recipes?userId=${filterByUserId}&getSavedRecipes=${getSavedRecipes}&searchStr=${searchStr}&recipeId=${recipeId}`
  );
  return getAllRecipesResponse.data;
};

export const sendRecipe = async (recipe: Recipe) => {
  const addRecipeResponse = await axios.post("/recipes/add", { recipe });
  return addRecipeResponse.data;
};

export const saveFavouriteRecipe = async (userId: string, recipeId?: string, apiId?: number) => {
  const setFavouriteResponse = await axios.post("/recipes/favourite", {
    userId,
    recipeId,
    apiId,
  });
  return setFavouriteResponse.data;
};

export const checkFavourite = async (userId: string, recipeId = "") => {
  const checkFavouriteResponse = await axios.get(`/recipes/favourite?userId=${userId}&recipeId=${recipeId}`);
  return checkFavouriteResponse.data;
};
