import produce from "immer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Recipe, Step } from "../../../../../common";
import SortableListRowStep3 from "./SortableListRowStep3";

interface CreateRecipeStep3Props {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  editMode: boolean;
  setStep: Dispatch<SetStateAction<string>>;
}

const SortableListStep3 = ({ recipe, setRecipe, editMode, setStep }: CreateRecipeStep3Props) => {
  const [instructionsCopy, setInstructionsCopy] = useState([]);

  useEffect(() => {
    const prepareInstructionsCopy = () => {
      const copy = JSON.parse(JSON.stringify(recipe.analyzedInstructions[0].steps));
      for (let i = 0; i < copy.length; i++) {
        copy[i].chosen = false;
      }
      setInstructionsCopy(copy);
    };
    prepareInstructionsCopy();
  }, [recipe]);

  const updateInstructions = (newState: any) => {
    const updatedRecipe = produce(recipe, (newRecipe) => {
      for (let i = 0; i < newState.length; i++) {
        newRecipe.analyzedInstructions[0].steps[i].step = newState[i].step;
        newRecipe.analyzedInstructions[0].steps[i].number = i + 1;
      }
    });
    setRecipe(updatedRecipe);
  };

  return (
    <div>
      {instructionsCopy.length > 0 && editMode ? (
        <ReactSortable
          list={instructionsCopy}
          setList={updateInstructions}
          animation={150}
          chosenClass="draggingRow"
          handle=".handleDrag"
        >
          {recipe.analyzedInstructions[0].steps.map((stepObject: Step, index: number) => (
            <SortableListRowStep3
              key={index}
              recipe={recipe}
              setRecipe={setRecipe}
              editMode={editMode}
              stepObject={stepObject}
              setStep={setStep}
              index={index}
            />
          ))}
        </ReactSortable>
      ) : (
        recipe.analyzedInstructions[0].steps.map((stepObject: Step, index: number) => (
          <SortableListRowStep3
            key={index}
            recipe={recipe}
            setRecipe={setRecipe}
            editMode={editMode}
            stepObject={stepObject}
            setStep={setStep}
            index={index}
          />
        ))
      )}
    </div>
  );
};

export default SortableListStep3;
