import { Dispatch, SetStateAction } from 'react';

export interface Recipe {
  category: string;
  name: string;
  title: string;
  minutes: number;
  portions: number;
}

export interface RecipeProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
}
