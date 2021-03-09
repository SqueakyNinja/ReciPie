import { Dispatch, SetStateAction } from "react";

export interface ExtendedIngredient {
  name: string;
  measures: {
    metric: {
      amount: number;
      unitShort: string;
    };
  };
}

// Ska se om jag kan hitta något via google, du har förmodligen sökt igenom allt redan...
// nuså, datorn skulle bara vakna
// jag har sällan andra problem än det här
// det brukar ju inte hjälpa, ni hittar rätt sak på 1 sek ändå :D
export interface AnalysedInstructions {
  name: string;
  steps: Step[];
}
export interface Step {
  number: number;
  step: string;
}
export interface Recipe {
  id: number;
  title: string;
  sourceName: string;
  servings: number;
  readyInMinutes: number;
  extendedIngredients: ExtendedIngredient[];
  instructions: {};
  image: string;
  dishTypes: string[];
  analyzedInstructions: AnalysedInstructions[];
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
