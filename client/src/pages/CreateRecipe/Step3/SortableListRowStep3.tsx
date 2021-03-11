import { ListItemText, IconButton, ListItem } from "@material-ui/core";
import { Dispatch, SetStateAction, useState } from "react";
import { combineClasses } from "../../../utils";
import styles from "../index.module.scss";
import produce from "immer";
import { Recipe, Step } from "../../../../../common";

interface RowProps {
  stepObject: Step;
  index: number;
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  editMode: boolean;
  setStep: Dispatch<SetStateAction<string>>;
}

const SortableListRowStep3 = ({ recipe, setRecipe, editMode, setStep, stepObject, index }: RowProps) => {
  const [deleteMode, setDeleteMode] = useState(false);

  const editEntry = (i: number, reason: "delete" | "edit") => {
    if (reason === "edit") {
      const currentInstructions = recipe.analyzedInstructions[0].steps?.filter((step, index) => index === i);
      setStep(currentInstructions[0].step);
    }
    const updatedRecipe = produce(recipe, (newRecipe) => {
      const filteredInstructions = newRecipe.analyzedInstructions[0].steps.filter((step, index) => index !== i);
      for (let i = 0; i < filteredInstructions.length; i++) {
        filteredInstructions[i].number = i + 1;
      }
      newRecipe.analyzedInstructions[0].steps = filteredInstructions;
    });
    setRecipe(updatedRecipe);
    if (reason === "delete") {
      setDeleteMode(false);
    }
  };

  return stepObject.step.length > 0 ? (
    <ListItem key={index} className={combineClasses("handleDrag", styles.sortableList, editMode && styles.editMode)}>
      <>
        <ListItemText primary={stepObject.number + "."} />
        <ListItemText primary={stepObject.step} />

        {!deleteMode ? (
          <>
            <IconButton
              onClick={() => editEntry(index, "edit")}
              disabled={editMode}
              children={<i style={{ width: "24px" }} className="far fa-edit"></i>}
            />
            <IconButton
              onClick={() => setDeleteMode(true)}
              disabled={editMode}
              children={<i style={{ width: "24px" }} className="far fa-trash-alt"></i>}
            />
          </>
        ) : (
          <>
            <IconButton onClick={() => editEntry(index, "delete")} children={<i className="fas fa-check"></i>} />
            <IconButton
              onClick={() => setDeleteMode(false)}
              children={<i style={{ width: "24px" }} className="fas fa-times"></i>}
            />
          </>
        )}
      </>
    </ListItem>
  ) : (
    <></>
  );
};

export default SortableListRowStep3;
