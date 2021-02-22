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
