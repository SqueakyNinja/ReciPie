import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { FixedSizeList } from "react-window";
import { Paper } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Search from "../MealGenerator/Search";
import { CuisineData, DietData, TypeData } from "./FilterData";
import styles from "./BrowseRecipe.module.scss";
import axios from "axios";
import MealGrid from "../MealGenerator/MealGrid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const BrowseRecipe = () => {
  const [checked, setChecked] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    const allTypes = newChecked.filter((x) => x.param === "type")
    console.log(allTypes)

    if (currentIndex === -1) {
      newChecked.push(value);

      switch (value.param) {
        case "type":
          //console.log(value.param)
          console.log([...type, value.value].join("+"))
          setType([...type, value.value].join("+"));
          break;

        case "cuisine":
          //console.log(value.param)
          setCuisine(value.value);
          break;

        case "diet":
          //console.log(value.param)
          setDiet(value.value);
          break;

        default:
          break;
      }
      
    } else {
      newChecked.splice(currentIndex, 1);

      switch (value.param) {
        case "type":
          //setType(""); Här vill vi ta bort endast det value som skickas in som parameter

          break;

        case "cuisine":
          setCuisine("");

          break;

        case "diet":
          setDiet("");

          break;
      }
    }
// console.log(newChecked);
    //fetchRecipes();
   
    setChecked(newChecked);
  };

  const fetchRecipes = async () => {
    const result = await axios(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: "34a95b9efbbe41dbaa0ba4b9d0d76287",
          // apiKey: "8080ada856dd4f439b4a065ae353d836",
          query: query,
          number: 2,
          sort: "popularity",
          type: type,
          cuisine: cuisine,
          diet: diet,
        },
      }
    );
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
  }, [query, checked]);
  return (
    <div className={styles.browseContainer}>
      <div className={styles.searchBox}>
        <Search query={query} setQuery={setQuery} />
        <button onClick={() => console.log(recipes)}>klicka</button>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.filters}>
          <Paper className={styles.filterPaper}>
            <h1>Filter your search</h1>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <List>
                    {TypeData.map((value, index) => {
                      const labelId = `checkbox-list-label-${value.value}`;
                      return (
                        <ListItem
                          key={index}
                          role={undefined}
                          dense
                          button
                          onClick={handleToggle(value)}
                          className={styles.eachListItems}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                              className={styles.eachListItemsCheckbox}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={value.title} />
                        </ListItem>
                      );
                    })}
                  </List>
                  </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Cuisine</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <List>
                    {CuisineData.map((value, index) => {
                      const labelId = `checkbox-list-label-${value.value}`;

                      return (
                        <ListItem
                          key={index}
                          role={undefined}
                          dense
                          button
                          onClick={handleToggle(value)}
                          className={styles.eachListItems}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                              className={styles.eachListItemsCheckbox}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={value.title} />
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Diet</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <List>
                    {DietData.map((value, index) => {
                      const labelId = `checkbox-list-label-${value.value}`;

                      return (
                        <ListItem
                          key={index}
                          role={undefined}
                          dense
                          button
                          onClick={handleToggle(value)}
                          className={styles.eachListItems}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                              className={styles.eachListItemsCheckbox}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={value.title} />
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </AccordionDetails>
            </Accordion>
          </Paper>{" "}
        </div>
        <div className={styles.searchResults}>
          <MealGrid recipes={recipes} />
        </div>
      </div>
    </div>
  );
};

export default BrowseRecipe;
