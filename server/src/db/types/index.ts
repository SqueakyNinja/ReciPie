import Knex from "knex";
import { Ingredients, IngredientsForRecipe, Recipe, User, UsersRecipesMap } from "../../../../common";

type DBRecipeExclude = Pick<
  Recipe,
  Exclude<keyof Recipe, "extendedIngredients" | "analyzedInstructions" | "dishTypes" | "id">
>;

export type DBRecipe = DBRecipeExclude & {
  id: string;
  extendedIngredients: string;
  analyzedInstructions: string;
  dishTypes: string;
};
declare module "knex/types/tables" {
  interface Tables {
    users: User;
    usersRecipesMap: UsersRecipesMap;
    recipes: DBRecipe;
    ingredientsForRecipe: IngredientsForRecipe;
    ingredients: Ingredients;
  }
}
