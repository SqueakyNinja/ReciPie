import { ListItem, ListItemText, IconButton } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import { combineClasses } from "../../../utils";
import { ExtendedIngredient, Recipe } from "../types";
import styles from "../index.module.scss";

interface SortableListRowProps {
  ingredient: ExtendedIngredient;
  index: number;
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  setIngredient: Dispatch<SetStateAction<string>>;
  setAmount: Dispatch<SetStateAction<React.ReactText>>;
  setUnitShort: Dispatch<SetStateAction<string>>;
  editMode: boolean;
}

function SortableListRow({
  ingredient,
  index,
  recipe,
  setRecipe,
  setIngredient,
  setAmount,
  setUnitShort,
  editMode,
}: SortableListRowProps) {
  const [deleteMode, setDeleteMode] = useState(false);
  const editEntry = (i: number) => {
    const filteredIngredients = recipe.extendedIngredients?.filter(
      (ingredient, index) => index !== i
    );
    const currentIngredients = recipe.extendedIngredients?.filter(
      (ingredient, index) => index === i
    );
    setRecipe({
      ...recipe,
      extendedIngredients: [...(filteredIngredients ?? [])],
    });
    currentIngredients && console.log(currentIngredients);
    if (currentIngredients) {
      setIngredient(currentIngredients[0].name);
      if (currentIngredients[0].measures.metric.amount) {
        setAmount(currentIngredients[0].measures.metric.amount);
      }
      setUnitShort(currentIngredients[0].measures.metric.unitShort);
    }
  };
  const deleteEntry = (i: number) => {
    const filteredRecipes = recipe.extendedIngredients?.filter(
      (ingredient, index) => index !== i
    );
    setRecipe({
      ...recipe,
      extendedIngredients: [...(filteredRecipes ?? [])],
    });
    setDeleteMode(false);
    console.log(filteredRecipes);
  };

  return ingredient.name.length > 0 ? (
    <ListItem
      key={index}
      className={combineClasses(
        "handleDrag",
        styles.sortableList,
        editMode && styles.editMode
      )}
    >
      <>
        {ingredient.measures.metric.amount > 0 && (
          <ListItemText primary={ingredient.measures.metric.amount} />
        )}
        {ingredient.measures.metric.unitShort.length > 0 && (
          <ListItemText primary={ingredient.measures.metric.unitShort} />
        )}

        <ListItemText primary={ingredient.name} />

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
}

export default SortableListRow;
