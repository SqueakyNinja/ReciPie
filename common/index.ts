export interface Recipe {
  id: string;
  title: string;
  image_url: string;
  instructions: string;
  dishtypes: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type LoginRequest = Pick<User, "username" | "password">;

export type NewUser = Pick<User, "username" | "email" | "password">;
export interface UserRecipesMap {
  id: string;
  user_id: string;
  recipe_id: string;
}

export interface IngredientsForRecipe {
  id: string;
  recipe_id: string;
  ingredient_id: string;
  amount: number;
  unitsOfMeassure: string;
}
export interface Ingredients {
  id: string;
  name: string;
}
