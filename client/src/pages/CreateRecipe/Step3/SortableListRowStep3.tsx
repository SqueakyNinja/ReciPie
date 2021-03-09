import { ListItemText, IconButton, ListItem } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import { combineClasses } from "../../../utils";
import { Recipe, Step } from "../types";
import styles from "../index.module.scss";
import produce from "immer";

interface SortableListRowStep3Props {
  editMode: boolean;
  stepObject: Step;
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
  index: number;
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
}

const SortableListRowStep3 = ({
  recipe,
  setRecipe,
  editMode,
  index,
  stepObject,
  step,
  setStep,
  number,
  setNumber,
}: SortableListRowStep3Props) => {
  const [deleteMode, setDeleteMode] = useState(false);

  const editEntry = (i: number) => {
    // const filteredRecipes = recipe.extendedIngredients?.filter(
    //   (ingredient, index) => index !== i
    // );
    // const currentRecipe = recipe.extendedIngredients?.filter(
    //   (ingredient, index) => index === i
    // );
    // setRecipe({
    //   ...recipe,
    //   extendedIngredients: [...(filteredRecipes ?? [])],
    // });
    // currentRecipe && console.log(currentRecipe);
    // if (currentRecipe) {
    //   setIngredient(currentRecipe[0].name);
    //   if (currentRecipe[0].measures.metric.amount) {
    //     setAmount(currentRecipe[0].measures.metric.amount);
    //   }
    //   setUnitShort(currentRecipe[0].measures.metric.unitShort);
    // }
  };
  const deleteEntry = (i: number) => {
    const updatedRecipe = produce(recipe, (newRecipe) => {
      const filteredInstructions = newRecipe.analyzedInstructions[0].steps?.filter(
        (step, index) => index !== i
      );
      newRecipe.analyzedInstructions[0].steps = filteredInstructions;
      for (let i = 0; i < filteredInstructions.length; i++) {
        newRecipe.analyzedInstructions[0].steps[i].number = i + 1;
      }
    });
    setRecipe(updatedRecipe);
    setDeleteMode(false);
  };

  return stepObject.step.length ? (
    <ListItem
      key={index}
      className={combineClasses(
        "handleDrag",
        styles.sortableList,
        editMode && styles.editMode
      )}
    >
      <>
        <ListItemText primary={stepObject.step} />
        {number > 0 && <ListItemText primary={number} />}
        {!deleteMode ? (
          <>
            <IconButton
              onClick={() => editEntry(index)}
              children={
                <i style={{ width: "24px" }} className="far fa-edit"></i>
              }
            />
            <IconButton
              onClick={() => setDeleteMode(true)}
              children={
                <i style={{ width: "24px" }} className="far fa-trash-alt"></i>
              }
            />
          </>
        ) : (
          <>
            <IconButton
              onClick={() => deleteEntry(index)}
              children={<i className="fas fa-check"></i>}
            />
            <IconButton
              onClick={() => setDeleteMode(false)}
              children={
                <i style={{ width: "24px" }} className="fas fa-times"></i>
              }
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
