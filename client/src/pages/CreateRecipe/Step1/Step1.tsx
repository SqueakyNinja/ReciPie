import { ChangeEvent } from 'react';
import { RecipeStepProps } from '../types';
import { TextField, Button } from '@material-ui/core';

import styles from '../index.module.scss';
import ImageDrop from '../../../components/ImageDrop/ImageDrop';

const Step1 = ({ recipe, setRecipe, setExpanded }: RecipeStepProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <div className={styles.steps}>
      <div className={styles.Step1}>
        <TextField
          className={`${styles.recipeName} ${styles.textfield}`}
          variant='outlined'
          label='Name of Recipe'
          name='title'
          onChange={handleChange}
        />

        <TextField
          className={`${styles.recipeServings} ${styles.textfield}`}
          variant='outlined'
          label='Number of portions'
          type='number'
          name='servings'
          onChange={handleChange}
        />

        <TextField
          className={`${styles.recipeTime} ${styles.textfield}`}
          variant='outlined'
          label='Estimated time (minutes)'
          type='number'
          name='readyInMinutes'
          onChange={handleChange}
        />
        <ImageDrop />

        <Button
          className={`${styles.secondaryButton} ${styles.nextButton}`}
          color='primary'
          variant='contained'
          onClick={() => setExpanded('panel2')}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1;
