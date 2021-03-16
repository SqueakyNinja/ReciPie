import { Dispatch, SetStateAction } from "react";

export interface Errors {
  title?: string;
  servings?: string;
  readyInMinutes?: string;
}
export interface ExtendedIngredient {
  name: string;
  measures: {
    metric: {
      amount: number;
      unitShort: string;
    };
  };
}
export interface AnalysedInstructions {
  name: string;
  steps: Step[];
}
export interface Step {
  number: number;
  step: string;
}
export interface Recipe {
  id?: string;
  title: string;
  sourceName: string;
  servings: number;
  readyInMinutes: number;
  extendedIngredients: ExtendedIngredient[];
  image: string;
  dishTypes: string[];
  analyzedInstructions: AnalysedInstructions[];
  createdBy?: string;
}

export interface RecipeProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
}

export interface RecipeStepProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  setExpanded: Dispatch<SetStateAction<any>>;
  errors: Errors;
  setErrors: Dispatch<SetStateAction<Errors>>;
}
