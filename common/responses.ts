export interface ParsedRecipe {
  id: string;
  title: string;
  image_url: string;
  instructions: Array<string>;
  dishtypes: Array<string>;
}

export interface RecipesResponse {
  recipes: ParsedRecipe[];
}
