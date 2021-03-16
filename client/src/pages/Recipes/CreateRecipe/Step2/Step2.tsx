import React, { useState, useEffect, ChangeEvent } from "react";
import axios, { AxiosResponse } from "axios";
import styles from "../index.module.scss";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { Button, TextField, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { FilterOptionsState } from "@material-ui/lab/useAutocomplete";
import SortableList from "./SortableList";
import { useStore } from "../../../../store";
import { RecipeStepProps } from "../types";
import { ExtendedIngredient } from "../../../../../../common";

interface Ingredient {
  category: string;
  id: number;
  name: string;
}

const Step2 = ({ recipe, setRecipe, setExpanded, errors, setErrors }: RecipeStepProps) => {
  const { setSnackbar } = useStore();
  const [firstAdd, setFirstAdd] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const [ingredientsOptions, setIngredientsOptions] = useState<Ingredient[]>([]);
  const [unitShort, setUnitShort] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [editMode, setEditMode] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setUnitShort(e.target.value as string);
  };

  const handleIngredientChange = (e: ChangeEvent<{}>, value: string) => {
    if (value === "") {
      setOpen(false);
    } else if (!open) {
      setOpen(true);
    }
    setIngredient(value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const addIngredient = () => {
    if (ingredient.length > 0) {
      const newAmount: number = Number(amount);
      const newIngredient: ExtendedIngredient = {
        name: ingredient,
        measures: {
          metric: {
            amount: newAmount,
            unitShort,
          },
        },
      };
      if (firstAdd) {
        setFirstAdd(false);
        setRecipe({
          ...recipe,
          extendedIngredients: [newIngredient],
        });
      } else {
        setRecipe({
          ...recipe,
          extendedIngredients: [...(recipe.extendedIngredients ?? []), newIngredient],
        });
      }

      setIngredient("");
      setAmount("");
      setUnitShort("");
    } else {
      setSnackbar("Please enter an ingredient in the field below", "error");
    }
  };

  //IngredientsOptions:
  useEffect(() => {
    const fetchIngredients = async () => {
      const result: AxiosResponse<Ingredient[]> = await axios("/ingredients.json");
      setIngredientsOptions(result.data);
    };

    fetchIngredients();
  }, []);

  const filterOptions: (
    options: Ingredient[],
    state: FilterOptionsState<Ingredient>
  ) => Ingredient[] = createFilterOptions({
    limit: 10,
  });

  return (
    <div className="Step2">
      <Autocomplete
        forcePopupIcon={false}
        open={open}
        inputValue={ingredient}
        onInputChange={handleIngredientChange}
        onClose={() => {
          setOpen(false);
        }}
        filterOptions={filterOptions}
        getOptionSelected={(option: Ingredient, value: Ingredient) => option.name === value.name}
        getOptionLabel={(ingredient: any) => ingredient.name}
        options={ingredientsOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Ingredient"
            variant="outlined"
            name="name"
            InputProps={{
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
            }}
          />
        )}
      />

      <div className="Step2Measurement">
        <TextField
          variant="outlined"
          label="Measurements, amount"
          type="number"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
        />

        <FormControl variant="outlined">
          <InputLabel>Units</InputLabel>

          <Select label="Grouping" name="unitShort" value={unitShort} onChange={handleSelectChange}>
            {/* <MenuItem value="" disabled>
              Imperial
            </MenuItem>
            <MenuItem value="tsp">teaspoon (tsp)</MenuItem>
            <MenuItem value="tbsp">tablespoon (tbsp)</MenuItem>
            <MenuItem value="cup">cup (c)</MenuItem>
            <MenuItem value="oz">ounce (oz)</MenuItem>
            <MenuItem value="pt">pint (pt)</MenuItem>
            <MenuItem value="qt">quart (qt)</MenuItem>
            <MenuItem value="gal">gallon (gal)</MenuItem>
            <MenuItem value="lb">pound (lb)</MenuItem> */}
            <MenuItem value="" disabled>
              Metric
            </MenuItem>

            <MenuItem value="">None</MenuItem>
            <MenuItem value="tsp">teaspoon (tsp)</MenuItem>
            <MenuItem value="tbsp">tablespoon (tbsp)</MenuItem>
            <MenuItem value="ml">milliliter (ml)</MenuItem>
            <MenuItem value="cl">centiliter (cl)</MenuItem>
            <MenuItem value="dl">deciliter (dl)</MenuItem>
            <MenuItem value="l">liter (l)</MenuItem>
            <MenuItem value="g">grams (g)</MenuItem>
            <MenuItem value="kg">kilograms (kg)</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button
        color="primary"
        variant="contained"
        className={styles.secondaryButton}
        onClick={addIngredient}
        disabled={editMode}
      >
        Add
      </Button>
      <Button
        color="primary"
        variant="contained"
        className={styles.secondaryButton}
        onClick={() => setExpanded("panel3")}
        disabled={editMode}
      >
        Next
      </Button>

      <div className={styles.listOfIngredients}>
        {recipe.extendedIngredients && (
          <SortableList
            recipe={recipe}
            setRecipe={setRecipe}
            setIngredient={setIngredient}
            setAmount={setAmount}
            setUnitShort={setUnitShort}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        )}
      </div>
    </div>
  );
};

export default Step2;
