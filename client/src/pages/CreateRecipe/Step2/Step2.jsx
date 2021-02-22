import React from 'react';

import {
  Button,
  TextField,
  FormControl,
  Select,
  ListSubheader,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

const Step2 = () => {
  return (
    <div className='Step2'>
      <TextField variant='outlined' label='Search Ingredients'></TextField>
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
