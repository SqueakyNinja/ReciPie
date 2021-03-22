import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Search from "../MealGenerator/Search";
import styles from "./BrowseRecipe.module.scss";
import axios from "axios";
import MealGrid from "../MealGenerator/MealGrid";

const BrowseRecipe = () => {
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  const fetchRecipes = async () => {
    const result = await axios("https://api.spoonacular.com/recipes/complexSearch", {
      params: {
        apiKey: "34a95b9efbbe41dbaa0ba4b9d0d76287",
        // apiKey: "8080ada856dd4f439b4a065ae353d836",
        query: query,
        number: 2,
        sort: "popularity",
      },
    });
    setRecipes(result.data.results);
    /*const savedRecipes = await getAllRecipes("", false, query);
    const savedApiRecipes = savedRecipes.recipes
      .filter((recipe) => recipe.apiId !== null)
      .map((recipe) => recipe.apiId);
    const filteredRecipes = result.data.results.filter((recipe) => {
      return savedApiRecipes.includes(recipe.id) === false;
    });
    const sortedRecipes = [...filteredRecipes, ...savedRecipes.recipes].sort();
    console.log(sortedRecipes);
    setRecipes(sortedRecipes);*/
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
    <div className={styles.browseContainer}>
      <div className={styles.searchBox}>
        <Search query={query} setQuery={setQuery}/>
        <button onClick={ () => console.log(recipes)}>klicka</button>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.filters}><List>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItem>
          );
        })}
      </List></div>
        <div className={styles.searchResults}><MealGrid recipes={recipes}  /></div>


      </div>
      
      
    </div>
  );
};

export default BrowseRecipe;
