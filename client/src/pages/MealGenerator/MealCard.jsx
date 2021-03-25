import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import { getAllRecipes } from "../../api/recipes";

const MealCard = () => {
  const recipeId = useParams().id;
  const apiKey = "8080ada856dd4f439b4a065ae353d836";
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (recipeId.length === 36) {
      const fetchRecipeFromDb = async () => {
        const result = await getAllRecipes("", false, "", recipeId);
        setRecipe(result.recipes[0]);
      };
      fetchRecipeFromDb();
    } else {
      const fetchRecipeFromApi = async () => {
        const result = await axios(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        setRecipe(result.data);
      };
      fetchRecipeFromApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <RecipeDetails recipe={recipe} />
    </div>
  );
};

export default MealCard;
