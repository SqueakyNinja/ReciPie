import axios from "axios";
import { Recipe } from "../../../common";

axios.defaults.baseURL = "http://localhost:9090/api";

export const sendRecipe = async (recipe: Recipe) => {
  const addRecipeResponse = await axios.post("/recipes/add", { recipe });
  return addRecipeResponse.data;
};
