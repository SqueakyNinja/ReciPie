import { Button } from "@material-ui/core";
import produce from "immer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Recipe, Step } from "../types";
import SortableListRowStep3 from "./SortableListRowStep3";

interface SortableListStep3Props {
  recipe: Recipe;
  setRecipe: Dispatch<SetStateAction<Recipe>>;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
}
function SortableListStep3({
  recipe,
  setRecipe,
  editMode,
  setEditMode,
  step,
  setStep,
  number,
  setNumber,
}: SortableListStep3Props) {
  const [instructionsCopy, setInstructionsCopy] = useState([]);

  useEffect(() => {
    const prepareInstructionsCopy = () => {
      const copy = JSON.parse(
        JSON.stringify(recipe.analyzedInstructions[0].steps)
      );
      for (let i = 0; i < copy.length; i++) {
        copy[i].chosen = false;
      }
      setInstructionsCopy(copy);
    };
    prepareInstructionsCopy();
  }, [recipe]);

  const updateInstructions = (newState: any) => {
    setInstructionsCopy(newState);

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
          {recipe.analyzedInstructions?.[0].steps?.map(
            (stepObject: Step, index: number) => (
              <SortableListRowStep3
                key={index}
                recipe={recipe}
                setRecipe={setRecipe}
                editMode={editMode}
                index={index}
                stepObject={stepObject}
                step={step}
                setStep={setStep}
                number={number}
                setNumber={setNumber}
              />
            )
          )}
        </ReactSortable>
      ) : (
        recipe.analyzedInstructions?.[0].steps?.map(
          (stepObject: Step, index: number) => (
            <SortableListRowStep3
              key={index}
              recipe={recipe}
              setRecipe={setRecipe}
              editMode={editMode}
              index={index}
              stepObject={stepObject}
              step={step}
              setStep={setStep}
              number={number}
              setNumber={setNumber}
            />
          )
        )
      )}
      <Button
        onClick={() => console.log(recipe.analyzedInstructions?.[0].steps)}
      >
        Log
      </Button>
    </div>
  );
}

export default SortableListStep3;
