import { useState, useEffect } from "react";
import axios from "axios";
import MealItem from "./MealItem";

const MealGenerator = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=8080ada856dd4f439b4a065ae353d836&query=pasta&number=2`
      );
      setRecipes(result.data.results);
    };

    fetchRecipes();
  }, []);

  console.log(recipes);

  return <div><MealItem recipes={recipes}/></div>;
};

export default MealGenerator;
