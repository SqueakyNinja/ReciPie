import styles from '../../Style/index.module.scss';
import React, { ChangeEvent, useState } from 'react';
import { RecipeProps } from '../types';

import { TextField, Button } from '@material-ui/core';

interface InputValues {
  title: string;
  portions: number;
  time: number;
}

const Step1 = ({ recipe, setRecipe }: RecipeProps) => {
  const [inputValues, setInputValues] = useState<InputValues>({
    title: '',
    portions: 0,
    time: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { title, value } = e.target;
    setInputValues({ ...inputValues, title: value });
  };

  return (
    <div className="'Step1">
      <TextField
        variant='outlined'
        label='Name of Recipe'
        value={inputValues.title}
        onChange={handleChange}
      />

      <br />
      <br />
      <TextField variant='outlined' label='Number of portions' type='number' />

      <br />
      <br />

      <TextField
        variant='outlined'
        label='Estimated time (minutes)'
        type='number'
      />
      <br />

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

export default Step1;
