import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
} from "@material-ui/core";
import styles from "./index.module.scss";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import RecipeDetails from "../MealGenerator/RecipeDetails";
import { Recipe } from "./types";

const CreateRecipe = () => {
  const [expanded, setExpanded] = useState("");
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    sourceName: "",
    servings: 0,
    readyInMinutes: 0,
    extendedIngredients: [
      {
        name: "",
        measures: {
          metric: {
            amount: 0,
            unitShort: "",
          },
        },
      },
    ],
    instructions: {},
    image: "http://placekitten.com/400/200",
    dishTypes: [],
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step: "",
          },
        ],
      },
    ],
  });

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    console.log(panel);
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          className={styles.accordionHeader}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={styles.heading}>
            1. Name, portions, time, picture
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Step1
            setExpanded={setExpanded}
            recipe={recipe}
            setRecipe={setRecipe}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          className={styles.accordionHeader}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={styles.heading}>2. Ingredients</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step2
            setExpanded={setExpanded}
            recipe={recipe}
            setRecipe={setRecipe}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          className={styles.accordionHeader}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={styles.heading}>3. Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step3 recipe={recipe} setRecipe={setRecipe} />
        </AccordionDetails>
      </Accordion>
      <div>
        <Button
          color="primary"
          variant="contained"
          className={styles.secondaryButton}
        >
          Submit
        </Button>
      </div>

      <RecipeDetails recipe={recipe} />
    </div>
  );
};

export default CreateRecipe;
