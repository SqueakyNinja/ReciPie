import { ParsedRecipe } from "../../../common/responses";
import db from "../db/connection";

export const selectAllRecipes = async () => {
  const recipes = await db("recipes");
  const parsedRecipes: ParsedRecipe[] = recipes.map((x) => {
    const parsedInstructions: string[] = JSON.parse(x.instructions);
    const parsedDishtypes: string[] = JSON.parse(x.dishtypes);
    return {
      id: x.id,
      title: x.title,
      image_url: x.image_url,
      instructions: parsedInstructions,
      dishtypes: parsedDishtypes,
    };
  });
  return parsedRecipes;
};
