import styles from "../../Style/index.module.scss";
import { ChangeEvent } from "react";
import { RecipeStepProps } from "../types";
import { TextField, Button } from "@material-ui/core";

const Step1 = ({ recipe, setRecipe, setExpanded }: RecipeStepProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <div className="Step1">
      <TextField variant="outlined" label="Name of Recipe" name="title" onChange={handleChange} />

      <br />
      <br />
      <TextField variant="outlined" label="Number of portions" type="number" name="servings" onChange={handleChange} />

      <br />
      <br />

      <TextField
        variant="outlined"
        label="Estimated time (minutes)"
        type="number"
        name="readyInMinutes"
        onChange={handleChange}
      />
      <br />

      <Button
        color="primary"
        variant="contained"
        className={styles.secondaryButton}
        onClick={() => setExpanded("panel2")}
      >
        Next
      </Button>
    </div>
  );
};

export default Step1;
