import styles from '../../Style/index.module.scss';

import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from '@material-ui/core';

import { RecipeProps } from '../types';

const Step3 = ({ recipe, setRecipe }: RecipeProps) => {
  return (
    <div className='Step3'>
      <TextField variant='outlined' label='Add Instructions' />

      <Button
        color='primary'
        variant='contained'
        className={styles.secondaryButton}
      >
        Add step
      </Button>
      <div>
        <Button
          color='primary'
          variant='contained'
          className={styles.secondaryButton}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default Step3;
