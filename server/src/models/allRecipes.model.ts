import db from "../db/connection";

export const selectAllRecipes = async () => {
  const recipes = await db("recipes");

  return recipes.map((x) => {
    x.instructions = JSON.parse(x.instructions);
    x.dishtypes = JSON.parse(x.dishtypes);
    return x;
  });
};
