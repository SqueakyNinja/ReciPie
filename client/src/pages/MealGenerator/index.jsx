import { useState, useEffect } from 'react';
import axios from 'axios';
import MealGrid from '../../components/MealGrid/MealGrid';
import Search from './Search';
import { getAllRecipes } from '../../api/recipes';

const MealGenerator = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  const fetchRecipes = async () => {
    const result = await axios(
      'https://api.spoonacular.com/recipes/complexSearch',
      {
        params: {
          apiKey: '34a95b9efbbe41dbaa0ba4b9d0d76287',
          // apiKey: "8080ada856dd4f439b4a065ae353d836",
          query: query,
          number: 2,
          sort: 'popularity',
        },
      }
    );

    const savedRecipes = await getAllRecipes('', false, query);
    const savedApiRecipes = savedRecipes.recipes
      .filter((recipe) => recipe.apiId !== null)
      .map((recipe) => recipe.apiId);
    const filteredRecipes = result.data.results.filter((recipe) => {
      return savedApiRecipes.includes(recipe.id) === false;
    });
    const sortedRecipes = [...filteredRecipes, ...savedRecipes.recipes].sort();
    console.log(sortedRecipes);
    setRecipes(sortedRecipes);
  };

  useEffect(() => {
    if (query.length > 0) {
      const timeoutVar = setTimeout(() => {
        fetchRecipes();
      }, 500);

      return () => clearTimeout(timeoutVar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <Search setQuery={setQuery} query={query} />
      <MealGrid recipes={recipes} />
    </div>
  );
};

export default MealGenerator;
