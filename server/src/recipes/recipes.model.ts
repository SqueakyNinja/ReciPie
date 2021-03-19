import { AnalysedInstructions, ExtendedIngredient, Ingredients, Recipe } from "../../../common";
import { DBRecipe } from "../db/types";
import { ParsedRecipe } from "../../../common/responses";
import db from "../db/connection";
import axios from "axios";

export const selectAllRecipes = async (userId: string, getSavedRecipes: boolean, searchStr = "") => {
  const recipes = await db("recipes")
    .select(["recipes.*", "users.username"])
    .leftJoin("users", "users.id", "recipes.createdBy")
    .modify((query) => {
      if (!!userId && !getSavedRecipes) {
        query.where({ createdBy: userId });
      }

      if (!!userId && getSavedRecipes) {
        query.leftJoin("usersRecipesMap", "usersRecipesMap.recipeId", "recipes.id").where({ userId });
      }
      if (!!searchStr.length) {
        query.where("title", "ilike", `%${searchStr}%`);
      }
    });
  const parsedRecipes: ParsedRecipe[] = recipes.map((x: DBRecipe & { username: string }) => {
    const parsedInstructions: AnalysedInstructions[] = JSON.parse(x.analyzedInstructions);
    const parsedDishtypes: string[] = JSON.parse(x.dishTypes);
    const parsedIngredients: ExtendedIngredient[] = JSON.parse(x.extendedIngredients);
    return {
      id: x.id,
      title: x.title,
      sourceName: x.username ?? x.sourceName,
      servings: x.servings,
      readyInMinutes: x.readyInMinutes,
      extendedIngredients: parsedIngredients,
      image: x.image,
      dishTypes: parsedDishtypes,
      analyzedInstructions: parsedInstructions,
      apiId: x.apiId,
    };
  });
  return parsedRecipes;
};

export const tryAddRecipe = async (recipe: Recipe) => {
  const formattedRecipe = {
    ...recipe,
    extendedIngredients: JSON.stringify(recipe.extendedIngredients),
    analyzedInstructions: JSON.stringify(recipe.analyzedInstructions),
    dishTypes: JSON.stringify(recipe.dishTypes),
  };
  try {
    const recipe = await db("recipes").insert(formattedRecipe).returning("id");
    return recipe[0];
  } catch (error) {
    console.log(error);
    throw "something went wrong while adding recipe";
  }
};

export const updateFavouriteStatus = async (userId: string, recipeId?: string, apiId?: number) => {
  if (apiId) {
    const [existingRecipe] = await db("recipes").where({ apiId });

    if (!!existingRecipe) {
      recipeId = existingRecipe.id;
    } else {
      const apiKey = "8080ada856dd4f439b4a065ae353d836";
      const { data } = await axios(`https://api.spoonacular.com/recipes/${apiId}/information?apiKey=${apiKey}`);
      const newRecipe = {
        title: data.title,
        sourceName: data.sourceName ? `${data.sourceName}, ${data.sourceUrl}` : data.sourceUrl,
        servings: data.servings,
        readyInMinutes: data.readyInMinutes,
        extendedIngredients: JSON.stringify(data.extendedIngredients),
        image: data.image,
        dishTypes: JSON.stringify(data.dishTypes),
        analyzedInstructions: JSON.stringify(data.analyzedInstructions),
        apiId,
      };
      const [returnedId] = await db("recipes").insert(newRecipe).returning("id");
      recipeId = returnedId;
    }
  }

  // Add or remove favourite recipe for a user

  const count = await db("usersRecipesMap").where({ recipeId, userId });
  if (count.length) {
    await db("usersRecipesMap").delete().where({ recipeId, userId });
  } else {
    await db("usersRecipesMap").insert({ recipeId, userId });
  }
};

export const getAllIngredients = async () => {
  const ingredients: Ingredients[] = await db("ingredients").select("ingredients.name");
  return ingredients;
};
