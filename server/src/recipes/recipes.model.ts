import { AnalysedInstructions, ExtendedIngredient, Recipe } from "../../../common";
import { ParsedRecipe } from "../../../common/responses";
import db from "../db/connection";

export const selectAllRecipes = async () => {
  const recipes = await db("recipes");
  const parsedRecipes: ParsedRecipe[] = recipes.map((x) => {
    const parsedInstructions: AnalysedInstructions[] = JSON.parse(x.analyzedInstructions);
    const parsedDishtypes: string[] = JSON.parse(x.dishTypes);
    const parsedIngredients: ExtendedIngredient[] = JSON.parse(x.extendedIngredients);
    return {
      id: x.id,
      title: x.title,
      sourceName: x.sourceName,
      servings: x.servings,
      readyInMinutes: x.readyInMinutes,
      extendedIngredients: parsedIngredients,
      image: x.image,
      dishTypes: parsedDishtypes,
      analyzedInstructions: parsedInstructions,
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
    await db("recipes").insert(formattedRecipe);
  } catch (error) {
    console.log(error);
    throw "something went wrong while adding recipe";
  }
};
