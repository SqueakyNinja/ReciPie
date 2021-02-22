import React from 'react';

const Step2 = () => {
  return (
    <div className='Step2'>
      <label htmlFor='search-ingredients'>Add ingredients: </label>
      <br />
      <input
        type='text'
        name='search-ingredients'
        placeholder='Enter ingredient'
      />
      <br />
      <div className='Step2-measurement'>
        <input type='text' />
        <select name='estimated-time'>
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
        </select>
      </div>
    </div>
  );
};

export default Step2;
