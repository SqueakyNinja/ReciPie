import React, { useState, useEffect, ChangeEvent } from "react";
import axios, { AxiosResponse } from "axios";
import styles from "../../Style/index.module.scss";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import {
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { FilterOptionsState } from "@material-ui/lab/useAutocomplete";
import { RecipeStepProps } from "../types";
// import { AnyAaaaRecord } from 'dns';

interface Ingredient {
  category: string;
  id: number;
  name: string;
}

const Step2 = ({ recipe, setRecipe, setExpanded }: RecipeStepProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [unitShort, setUnitShort] = useState("");
  const [amount, setAmount] = useState(0);
  //Ingredients:

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (recipe.extendedIngredients) {
      // const newIngredient = { [name]: value };
      setRecipe({ ...recipe, [name]: value });
    }
    console.log(name, value);
    console.log(recipe);
  };

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setUnitShort(e.target.value as string);

    // setRecipe({ ...recipe, [name]: value });
    console.log(e.target);
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      const result: AxiosResponse<Ingredient[]> = await axios(
        "/ingredients.json"
      );
      setIngredients(result.data);
    };

    fetchIngredients();
  }, []);

  const filterOptions: (
    options: Ingredient[],
    state: FilterOptionsState<Ingredient>
  ) => Ingredient[] = createFilterOptions({
    limit: 10,
  });

  ///// ----- /////

  return (
    <div className="Step2">
      <Autocomplete
        forcePopupIcon={false}
        open={open}
        onInputChange={(e: ChangeEvent<{}>, value: string) => {
          if (value === "") {
            setOpen(false);
          } else if (!open) {
            setOpen(true);
          }
        }}
        onClose={() => {
          setOpen(false);
        }}
        filterOptions={filterOptions}
        getOptionSelected={(option: Ingredient, value: Ingredient) =>
          option.name === value.name
        }
        getOptionLabel={(ingredient: any) => ingredient.name}
        options={ingredients}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Ingredient"
            variant="outlined"
            name="name"
            onChange={handleChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
            }}
          />
        )}
      />

      <br />
      <br />
      <div className="Step2Measurement">
        <TextField
          variant="outlined"
          label="Measurements, amount"
          type="number"
        />

        <FormControl variant="outlined">
          <InputLabel>Units</InputLabel>

          <Select
            label="Grouping"
            name="unitShort"
            onChange={handleSelectChange}
            value={unitShort}
          >
            <MenuItem value="units" disabled>
              Units
            </MenuItem>
            <MenuItem value="" disabled>
              Imperial
            </MenuItem>
            <MenuItem value="tsp">teaspoon (tsp)</MenuItem>
            <MenuItem value="tbsp">tablespoon (tbsp)</MenuItem>
            <MenuItem value="cup">cup (c)</MenuItem>
            <MenuItem value="oz">ounce (oz)</MenuItem>
            <MenuItem value="pt">pint (pt)</MenuItem>
            <MenuItem value="qt">quart (qt)</MenuItem>
            <MenuItem value="gal">gallon (gal)</MenuItem>
            <MenuItem value="lb">pound (lb)</MenuItem>
            <MenuItem value="" disabled>
              Metric
            </MenuItem>

            <MenuItem value="mtsp">teaspoon (tsp)</MenuItem>
            <MenuItem value="mtbsp">tablespoon (tbsp)</MenuItem>
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
        onClick={() => setExpanded("panel3")}
      >
        Next
      </Button>
    </div>
  );
};

export default Step2;
