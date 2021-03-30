import { useEffect, useState } from "react";
import { getAllRecipes } from "../../../api/recipes";
import MealCard from "../../../components/MealCard/MealCard";
import MealGrid from "../../../components/MealGrid/MealGrid";
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
        <MealGrid recipes={myRecipes} />
      </div>
      <div>
        <br />
        <br />
      </div>
      <div>
        <h2>Saved Recipes</h2>
        <MealGrid recipes={savedRecipes} />
      </div>
    </div>
  );
};

export default MyRecipes;
