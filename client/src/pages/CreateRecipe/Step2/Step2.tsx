import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import styles from '../../Style/index.module.scss';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

import {
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  CircularProgress,
} from '@material-ui/core';
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete';
import { RecipeProps } from '../types';
// import { AnyAaaaRecord } from 'dns';

interface Ingredient {
  category: string;
  id: number;
  name: string;
}

const Step2 = ({ recipe, setRecipe }: RecipeProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const result: AxiosResponse<Ingredient[]> = await axios(
        '/ingredients.json'
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

  return (
    <div className='Step2'>
      {/* <TextField variant='outlined' label='Search Ingredients'></TextField> */}
      <Autocomplete
        forcePopupIcon={false}
        open={open}
        onInputChange={(e: ChangeEvent<{}>, value: string) => {
          if (value === '') {
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
            label='Search Ingredient'
            variant='outlined'
            InputProps={{
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
            }}
          />
        )}
      />

      <br />
      <br />
      <div className='Step2Measurement'>
        <TextField
          variant='outlined'
          label='Measurements, amount'
          type='number'
        />

        <FormControl variant='outlined'>
          <InputLabel>Measurements</InputLabel>
          {/* <Select native defaultValue=''> */}
          <Select label='Groupinhg'>
            {/* <option aria-label='None' value='' /> */}
            <optgroup label='Imperial'>
              <option value='tsp'>teaspoon (tsp)</option>
              <option value='tbsp'>tablespoon (tbsp)</option>
              <option value='cup'>cup (c)</option>
              <option value='oz'>ounce (oz)</option>
              <option value='pt'>pint (pt)</option>
              <option value='qt'>quart (qt)</option>
              <option value='gal'>gallon (gal)</option>
              <option value='lb'>pound (lb)</option>
            </optgroup>
            <optgroup label='Metric'>
              <option value='mtsp'>teaspoon (tsp)</option>
              <option value='mtbsp'>tablespoon (tbsp)</option>
              <option value='ml'>milliliter (ml)</option>
              <option value='cl'>centiliter (cl)</option>
              <option value='dl'>deciliter (dl)</option>
              <option value='l'>liter (l)</option>
              <option value='g'>grams (g)</option>
              <option value='kg'>kilograms (kg)</option>
            </optgroup>
          </Select>
        </FormControl>
      </div>

      <Button
        color='primary'
        variant='contained'
        className={styles.secondaryButton}
      >
        Next
      </Button>
    </div>
  );
};

export default Step2;
