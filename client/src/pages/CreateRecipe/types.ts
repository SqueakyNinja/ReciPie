import { Dispatch, SetStateAction } from 'react';

export interface Recipe {
  category: string;
  id: number;
  name: string;
  title: string;
}

export interface RecipeProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
}
