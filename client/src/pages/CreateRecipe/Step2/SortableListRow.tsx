import { ListItem, ListItemText, IconButton } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import { combineClasses } from "../../../utils";
import { ExtendedIngredient, Recipe } from "../types";
import styles from "../index.module.scss";

interface SortableListRowProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  ingredient: ExtendedIngredient;
  setIngredient: Dispatch<SetStateAction<string>>;
  setAmount: Dispatch<SetStateAction<React.ReactText>>;
  setUnitShort: Dispatch<SetStateAction<string>>;
  editMode: boolean;
  index: number;
}

function SortableListRow({
  recipe,
  setRecipe,
  ingredient,
  setIngredient,
  setAmount,
  setUnitShort,
  editMode,
  index,
}: SortableListRowProps) {
  const [deleteMode, setDeleteMode] = useState(false);
  const editEntry = (i: number, reason: "edit" | "delete") => {
    if (reason === "edit") {
      const currentIngredients = recipe.extendedIngredients?.filter((ingredient, index) => index === i);
      setIngredient(currentIngredients[0].name);
      setAmount(currentIngredients[0].measures.metric.amount);
      setUnitShort(currentIngredients[0].measures.metric.unitShort);
    }
    const filteredIngredients = recipe.extendedIngredients?.filter((ingredient, index) => index !== i);
    setRecipe({
      ...recipe,
      extendedIngredients: [...(filteredIngredients ?? [])],
    });
    if (reason === "delete") {
      setDeleteMode(false);
    }
  };

  return ingredient.name.length > 0 ? (
    <ListItem key={index} className={combineClasses("handleDrag", styles.sortableList, editMode && styles.editMode)}>
      <>
        {ingredient.measures.metric.amount > 0 && <ListItemText primary={ingredient.measures.metric.amount} />}
        {ingredient.measures.metric.unitShort.length > 0 && (
          <ListItemText primary={ingredient.measures.metric.unitShort} />
        )}

        <ListItemText primary={ingredient.name} />

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
}

export default SortableListRow;
