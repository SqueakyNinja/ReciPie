import styles from "../index.module.scss";
import { RecipeStepProps } from "../types";
import { TextField, Button } from "@material-ui/core";
import { validateRecipe } from "./validateRecipe";
import { ChangeEvent, useRef } from "react";
import { useStore } from "../../../../store";
import ImageDrop from "../../../../components/ImageDrop";

interface Values {
  title: string;
  servings: number;
  readyInMinutes: number;
}

const Step1 = ({ recipe, setRecipe, setExpanded, errors, setErrors }: RecipeStepProps) => {
  const { setSnackbar } = useStore();
  const values = useRef<Values>({
    title: "",
    servings: 0,
    readyInMinutes: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
    values.current = {
      ...values.current,
      [name]: value,
    };

    setErrors(validateRecipe(values.current));
  };

  const handleNext = () => {
    Object.keys(errors).length === 0 && values.current.title
      ? setExpanded("panel2")
      : setSnackbar("Please fill the required fields", "error");
  };

  return (
    <div className={styles.steps}>
      <div className={styles.Step1}>
        <TextField
          className={`${styles.recipeName} ${styles.textfield}`}
          variant="outlined"
          label="Name of Recipe"
          name="title"
          onChange={handleChange}
        />
        {errors.title && <p>{errors.title}</p>}
        <TextField
          className={`${styles.recipeServings} ${styles.textfield}`}
          variant="outlined"
          label="Number of portions"
          type="number"
          name="servings"
          onChange={handleChange}
        />
        {errors.servings && <p>{errors.servings}</p>}

        <TextField
          className={`${styles.recipeTime} ${styles.textfield}`}
          variant="outlined"
          label="Estimated time (minutes)"
          type="number"
          name="readyInMinutes"
          onChange={handleChange}
        />
        {errors.readyInMinutes && <p>{errors.readyInMinutes}</p>}

        <ImageDrop recipe={recipe} setRecipe={setRecipe} />

        <Button
          className={`${styles.secondaryButton} ${styles.nextButton}`}
          color="primary"
          variant="contained"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1;
