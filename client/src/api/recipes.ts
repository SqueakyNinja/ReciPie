import axios from "axios";
import { Recipe } from "../../../common";

axios.defaults.baseURL = "https://reci-pie-server.herokuapp.com/api";

export const getAllRecipes = async (filterByUserId = "", getSavedRecipes = false, searchStr = "") => {
  const getAllRecipesResponse = await axios.get(
    `/recipes?userId=${filterByUserId}&getSavedRecipes=${getSavedRecipes}&searchStr=${searchStr}`
  );
  return getAllRecipesResponse.data;
};

export const sendRecipe = async (recipe: Recipe) => {
  const addRecipeResponse = await axios.post("/recipes/add", { recipe });
  return addRecipeResponse.data;
};

export const saveFavouriteRecipe = async (userId: string, recipeId?: string, apiId?: number) => {
  const addRecipeResponse = await axios.post("/recipes/favourite", { userId, recipeId, apiId });
  return addRecipeResponse.data;
};
