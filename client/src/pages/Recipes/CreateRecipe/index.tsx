import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Button } from "@material-ui/core";
import styles from "./index.module.scss";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import RecipeDetails from "../../MealGenerator/RecipeDetails";
import { sendRecipe } from "../../../api/recipes";
import { Recipe } from "../../../../../common";
import { useStore } from "../../../store";
import { useHistory } from "react-router";
import { Errors } from "./types";

const CreateRecipe = () => {
  const { currentUser, setSnackbar } = useStore();
  const [expanded, setExpanded] = useState("");
  const history = useHistory();
  const [errors, setErrors] = useState<Errors>({});
  const [recipe, setRecipe] = useState<Recipe>({
    title: "Test",
    sourceName: "",
    servings: 4,
    readyInMinutes: 45,
    extendedIngredients: [
      {
        name: "Cheese",
        measures: {
          metric: {
            amount: 2,
            unitShort: "dl",
          },
        },
      },
    ],
    image: "http://placekitten.com/400/200",
    dishTypes: ["Cheesy"],
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step: "Eat cheese",
          },
        ],
      },
    ],
    createdBy: currentUser.id,
  });

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = () => {
    try {
      const addRecipe = sendRecipe(recipe);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser.id.length === 0) {
      setSnackbar("Please login to use this feature", "info");
      history.push("/account/login");
    }
  }, [currentUser]);
  return (
    <div className={styles.root}>
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary className={styles.accordionHeader} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography className={styles.heading}>1. Name, portions, time, picture</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Step1
            setExpanded={setExpanded}
            recipe={recipe}
            setRecipe={setRecipe}
            errors={errors}
            setErrors={setErrors}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary className={styles.accordionHeader} aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography className={styles.heading}>2. Ingredients</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step2
            setExpanded={setExpanded}
            recipe={recipe}
            setRecipe={setRecipe}
            errors={errors}
            setErrors={setErrors}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <AccordionSummary className={styles.accordionHeader} aria-controls="panel3bh-content" id="panel3bh-header">
          <Typography className={styles.heading}>3. Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Step3 recipe={recipe} setRecipe={setRecipe} />
        </AccordionDetails>
      </Accordion>
      <div>
        <Button color="primary" variant="contained" className={styles.secondaryButton} onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <RecipeDetails recipe={recipe} />
    </div>
  );
};

export default CreateRecipe;
