<<<<<<< HEAD
import { useState, useEffect } from "react";
import Search from "../MealGenerator/Search";
import styles from "./BrowseRecipe.module.scss";
import axios from "axios";
import MealGrid from "../../components/MealGrid/MealGrid";
import Filter from "./Filter";
import { getAllRecipes } from "../../api/recipes";
=======
import { useState, useEffect } from 'react';
import Search from '../../components/Search/Search';
import styles from './BrowseRecipe.module.scss';
import axios from 'axios';
import MealGrid from '../../components/MealGrid/MealGrid';
import Filter from './Filter';
import { useStore } from '../../store';
import { Paper } from '@material-ui/core';
import { getAllRecipes } from '../../api/recipes';
>>>>>>> 1d206a3e11e680e37ad76ea9681224bd00912648

const BrowseRecipe = () => {
  const [checked, setChecked] = useState([]);
  const [recipes, setRecipes] = useState([]);
<<<<<<< HEAD
  const [query, setQuery] = useState("");
=======
  const { query, setQuery } = useStore();
>>>>>>> 1d206a3e11e680e37ad76ea9681224bd00912648
  const [type, setType] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [diet, setDiet] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);

      switch (value.param) {
        case "type":
          setType([...type, value.value]);
          break;

        case "cuisine":
          setCuisine([...cuisine, value.value]);
          break;

        case "diet":
          setDiet([...diet, value.value]);
          break;

        default:
          break;
      }
    } else {
      newChecked.splice(currentIndex, 1);

      switch (value.param) {
        case "type":
          const newTypes = type.filter((x) => x !== value.value);
          setType(newTypes);
          break;

        case "cuisine":
          const newCuisines = cuisine.filter((x) => x !== value.value);
          setCuisine(newCuisines);
          break;

        case "diet":
          const newDiets = diet.filter((x) => x !== value.value);
          setDiet(newDiets);
          break;
        default:
          break;
      }
    }

    setChecked(newChecked);
  };

  const fetchRecipes = async () => {
    const typeString = type.join(",");
    const dietString = diet.join(",");
    const cuisineString = cuisine.join(",");

    const result = await axios("https://api.spoonacular.com/recipes/complexSearch", {
      params: {
        apiKey: "34a95b9efbbe41dbaa0ba4b9d0d76287",
        // apiKey: "8080ada856dd4f439b4a065ae353d836",
        query: query,
        number: 2,
        sort: "popularity",
        type: typeString,
        diet: dietString,
        cuisine: cuisineString,
      },
    });
    setRecipes(result.data.results);
    const savedRecipes = await getAllRecipes("", false, query);
    const savedApiRecipes = savedRecipes.recipes
      .filter((recipe) => recipe.apiId !== null)
      .map((recipe) => recipe.apiId);
    const filteredRecipes = result.data.results.filter((recipe) => {
      return savedApiRecipes.includes(recipe.id) === false;
    });
    const sortedRecipes = [...filteredRecipes, ...savedRecipes.recipes].sort();
    setRecipes(sortedRecipes);
  };

  const fetchRandom = async () => {
    const result = await axios(
      'https://api.spoonacular.com/recipes/random?number=2&apiKey=34a95b9efbbe41dbaa0ba4b9d0d76287'
    );
    console.log(result.data.results);
    //setRecipes(result.data.results);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const timeoutVar = setTimeout(() => {
        fetchRecipes();
      }, 500);

      return () => clearTimeout(timeoutVar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, checked]);

  return (
    <Paper elevation={3} className={styles.browseContainer}>
      <div className={styles.searchBox}>
        <Search query={query} setQuery={setQuery} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.filters}>
          <Filter handleToggle={handleToggle} checked={checked} />
        </div>
        <div className={styles.searchResults}>
          <MealGrid recipes={recipes} />
        </div>
      </div>
    </Paper>
  );
};

export default BrowseRecipe;
