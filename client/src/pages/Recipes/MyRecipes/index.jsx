import { useEffect, useState } from "react";
import { getAllRecipes } from "../../../api/recipes";
import RecipeDetails from "../../../components/RecipeDetails/RecipeDetails";
import { useStore } from "../../../store";

const MyRecipes = () => {
  const { currentUser } = useStore();
  const [myRecipes, setMyRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const myData = await getAllRecipes(currentUser.id);
        setMyRecipes(myData.recipes);
        const savedData = await getAllRecipes(currentUser.id, true);
        setSavedRecipes(savedData.recipes);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>
        <h2>Created Recipes</h2>

        {myRecipes.map((eachRecipe, index) => {
          //   Ersätt RecipeDetails med typ RecipeSummary?
          return <RecipeDetails recipe={eachRecipe} key={index} />;
        })}
      </div>
      <div>
        <br />
        <br />
      </div>
      <div>
        <h2>Saved Recipes</h2>
        {savedRecipes.map((eachRecipe, index) => {
          //   Ersätt RecipeDetails med typ RecipeSummary?
          return <RecipeDetails recipe={eachRecipe} key={index} />;
        })}
      </div>
    </div>
  );
};

export default MyRecipes;
