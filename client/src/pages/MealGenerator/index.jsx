import { useState, useEffect } from "react";
import axios from "axios";
import MealGrid from "./MealGrid";
import Search from "./Search";

const MealGenerator = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  
  
  const fetchRecipes = async () => {
    const result = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=8080ada856dd4f439b4a065ae353d836&query=${query}&number=6`
      )
      setRecipes(result.data.results)};

      useEffect(() => {
        const timeoutVar = setTimeout(() => {
          fetchRecipes()
        }, 500)

        return () => clearTimeout(timeoutVar);
    },

    
   [query]);

  console.log(recipes);

  return (
    <div>
      <Search getQuery={(query) => setQuery(query)}/>
      <MealGrid recipes={recipes}/>
    </div>);
};

export default MealGenerator;
