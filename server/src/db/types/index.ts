import Knex from "knex";
import {
  Ingredients,
  IngredientsForRecipe,
  Recipe,
  User,
  UserRecipesMap,
} from "../../../../common";

declare module "knex/types/tables" {
  interface Tables {
    users: User;
    userRecipeMap: UserRecipesMap;
    recipes: Recipe;
    ingredientsForRecipe: IngredientsForRecipe;
    ingredients: Ingredients;
  }
}
