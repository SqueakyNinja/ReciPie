import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";

const MealCard = () => {
  const recipeId = useParams().id;
  const apiKey = "8080ada856dd4f439b4a065ae353d836";
  const [recipe, setRecipe] = useState({});

  const fetchRecipe = async () => {
    const result = await axios(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
    setRecipe(result.data);
  };

  useEffect(() => {
    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <RecipeDetails recipe={recipe} />
    </div>
  );
};

export default MealCard;
