import { AnalysedInstructions, ExtendedIngredient } from ".";

export interface ParsedRecipe {
  id: string;
  title: string;
  sourceName: string;
  servings: number;
  readyInMinutes: number;
  extendedIngredients: ExtendedIngredient[];
  image: string;
  dishTypes: string[];
  analyzedInstructions: AnalysedInstructions[];
}

export interface RecipesResponse {
  recipes: ParsedRecipe[];
}
