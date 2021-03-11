import Knex from "knex";
import { Ingredients, IngredientsForRecipe, Recipe, User, UserRecipesMap } from "../../../../common";

type DBRecipeExclude = Pick<
  Recipe,
  Exclude<keyof Recipe, "extendedIngredients" | "analyzedInstructions" | "dishTypes" | "id">
>;

type DBRecipe = DBRecipeExclude & {
  id: string;
  extendedIngredients: string;
  analyzedInstructions: string;
  dishTypes: string;
};
declare module "knex/types/tables" {
  interface Tables {
    users: User;
    userRecipeMap: UserRecipesMap;
    recipes: DBRecipe;
    ingredientsForRecipe: IngredientsForRecipe;
    ingredients: Ingredients;
  }
}
