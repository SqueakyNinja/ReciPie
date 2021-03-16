import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SortableListRow from "./SortableListRow";
import { ReactSortable } from "react-sortablejs";
import { ExtendedIngredient, Recipe } from "../../../../../../common";

interface SortableListProps {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  setIngredient: Dispatch<SetStateAction<string>>;
  setAmount: Dispatch<SetStateAction<React.ReactText>>;
  setUnitShort: Dispatch<SetStateAction<string>>;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const SortableList = ({
  recipe,
  setRecipe,
  setIngredient,
  setAmount,
  setUnitShort,
  editMode,
  setEditMode,
}: SortableListProps) => {
  const [extendedIngredientsCopy, setExtendedIngredientsCopy] = useState([]);

  useEffect(() => {
    const prepareExtendedIngredientsCopy = () => {
      const copy = JSON.parse(JSON.stringify(recipe.extendedIngredients));
      for (let i = 0; i < copy.length; i++) {
        copy[i].chosen = false;
      }
      setExtendedIngredientsCopy(copy);
    };
    prepareExtendedIngredientsCopy();
  }, [recipe]);

  const updateExtentedIngredients = (newState: any) => {
    setExtendedIngredientsCopy(newState);
    setRecipe({
      ...recipe,
      extendedIngredients: [...(newState ?? [])],
    });
  };

  return (
    <div>
      <div>
        {extendedIngredientsCopy.length > 0 && editMode ? (
          <ReactSortable
            list={extendedIngredientsCopy}
            setList={updateExtentedIngredients}
            animation={150}
            chosenClass="draggingRow"
            handle=".handleDrag"
          >
            {recipe.extendedIngredients &&
              recipe.extendedIngredients.map((ingredient: ExtendedIngredient, index: number) => (
                <SortableListRow
                  ingredient={ingredient}
                  index={index}
                  recipe={recipe}
                  setRecipe={setRecipe}
                  key={index}
                  setIngredient={setIngredient}
                  setAmount={setAmount}
                  setUnitShort={setUnitShort}
                  editMode={editMode}
                />
              ))}
          </ReactSortable>
        ) : (
          recipe.extendedIngredients &&
          recipe.extendedIngredients.map((ingredient: ExtendedIngredient, index: number) => (
            <SortableListRow
              ingredient={ingredient}
              index={index}
              recipe={recipe}
              setRecipe={setRecipe}
              key={index}
              setIngredient={setIngredient}
              setAmount={setAmount}
              setUnitShort={setUnitShort}
              editMode={editMode}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SortableList;
