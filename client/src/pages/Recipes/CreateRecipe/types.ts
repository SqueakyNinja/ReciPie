import { Dispatch, SetStateAction } from "react";
import { Recipe } from "../../../../../common";

export interface RecipeProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
}

export interface Errors {
  title?: string;
  servings?: string;
  readyInMinutes?: string;
  
}

export interface RecipeStepProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  setExpanded: Dispatch<SetStateAction<any>>;
  errors: Errors;
  setErrors: Dispatch<SetStateAction<Errors>>;
}
