import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const Step2 = () => {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const result = await axios('/ingredients.json');
      setIngredients(result.data);

      // const response = await axios(
      //   'https://country.register.gov.uk/records.json?page-size=5000'
      // );
      // console.log(response.data);
      // // const countries = await response.json();

      // setOptions(
      //   Object.keys(response.data).map((key) => response.data[key].item[0])
      // );
    };

    fetchIngredients();
  }, []);

  const filterOptions = createFilterOptions({
    limit: 10,
  });

  return (
    <div className='Step2'>
      {/* <TextField variant='outlined' label='Search Ingredients'></TextField> */}
      <Autocomplete
        forcePopupIcon={false}
        open={open}
        onOpen={(e) => {
          if (e.target.value !== '') {
            setOpen(true);
          }
        }}
        onInputChange={(e) => {
          if (e.target.value === '') {
            setOpen(false);
          }
        }}
        onClose={() => {
          setOpen(false);
        }}
        filterOptions={filterOptions}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(ingredient) => ingredient.name}
        options={ingredients}
        // loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Asynchronous'
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
        <TextField variant='outlined' label='Measurements' type='number' />

        <FormControl variant='outlined'>
          <InputLabel>Grouping</InputLabel>
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
    </div>
  );
};

export default Step2;
