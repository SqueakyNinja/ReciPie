import styles from '../../Style/index.module.scss';

import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from '@material-ui/core';

const Step3 = () => {
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
    </div>
  );
};

export default Step3;
