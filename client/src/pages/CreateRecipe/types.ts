import { Dispatch, SetStateAction } from "react";

export interface ExtendedIngredients {
  name?: string;
  measures?: {
    metric?: {
      amount?: number;
      unitShort?: string;
    };
  };
}

export interface AnalysedInstructions {
  name?: string;
  steps?: Step[];
}

export interface Step {
  number?: number;
  step?: string;
}
export interface Recipe {
  id?: number;
  title?: string;
  sourceName?: string;
  servings?: number;
  readyInMinutes?: number;
  extendedIngredients?: ExtendedIngredients[];
  instructions?: {};
  image?: string;
  dishTypes?: string[];
  analyzedInstructions?: AnalysedInstructions[];
}

export interface RecipeProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
}

export interface RecipeStepProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  setExpanded: Dispatch<SetStateAction<any>>;
}
