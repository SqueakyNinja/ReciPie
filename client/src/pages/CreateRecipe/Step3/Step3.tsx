import styles from "../../Style/index.module.scss";
import produce from "immer";
import { TextField, Button } from "@material-ui/core";

import { RecipeProps } from "../types";
import SortableListStep3 from "./SortableListStep3";
import { ChangeEvent, useState } from "react";

const Step3 = ({ recipe, setRecipe }: RecipeProps) => {
  const [firstAdd, setFirstAdd] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [step, setStep] = useState("");
  const [number, setNumber] = useState(0);

  const addStep = () => {
    if (step.length > 0) {
      const newNumber = recipe.analyzedInstructions?.[0].steps
        ? recipe.analyzedInstructions[0].steps.length + 1
        : 1;
      const newInstruction = {
        number: newNumber,
        step,
      };

      const updatedRecipe = produce(recipe, (newRecipe) => {
        if (firstAdd && newRecipe.analyzedInstructions?.[0].steps) {
          setFirstAdd(false);
          newRecipe.analyzedInstructions[0].steps[0].step = step;
          newRecipe.analyzedInstructions[0].steps[0].number = 1;
        } else {
          newRecipe.analyzedInstructions?.[0].steps?.push(newInstruction);
        }
      });

      setRecipe(updatedRecipe);
    } else {
      // setSnackbar("Please enter instructions in the field below", "error")
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStep(e.target.value);
  };

  const handleEditmode = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      <div className="Step3">
        <TextField
          variant="outlined"
          label="Add Instructions"
          value={step}
          onChange={handleChange}
        />

        <Button
          color="primary"
          variant="contained"
          className={styles.secondaryButton}
          onClick={addStep}
          disabled={editMode}
        >
          Add step
        </Button>
      </div>
      <div>
        {recipe.analyzedInstructions && (
          <SortableListStep3
            recipe={recipe}
            setRecipe={setRecipe}
            editMode={editMode}
            setEditMode={setEditMode}
            setStep={setStep}
            number={number}
            step={step}
            setNumber={setNumber}
          />
        )}
        <Button variant="contained" color="primary" onClick={handleEditmode}>
          {editMode ? "Done" : "Edit order"}
        </Button>
      </div>
    </div>
  );
};

export default Step3;
