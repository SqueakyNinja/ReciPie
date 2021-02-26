import React from 'react';

import styles from '../../Style/index.module.scss';

import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from '@material-ui/core';

const Step1 = () => {
  return (
    <div className="'Step1">
      <TextField variant='outlined' label='Name of Recipe' />

      <br />
      <br />
      <TextField variant='outlined' label='Number of portions' type='number' />

      <br />
      <br />

      <label htmlFor='estimated-time'>Estimated time</label>
      <div>
        <FormControl variant='outlined'>
          <InputLabel>Hours</InputLabel>
          <Select label='Hours'>
            {/* <MenuItem value=''>
              <em>None</em>
            </MenuItem> */}
            <MenuItem value='0'>0</MenuItem>
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='2'>2</MenuItem>
            <MenuItem value='3'>3</MenuItem>
            <MenuItem value='4'>4</MenuItem>
            <MenuItem value='5'>5</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant='outlined'>
          <InputLabel>Minutes</InputLabel>
          <Select label='Minutes'>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='0'>0</MenuItem>
            <MenuItem value='5'>5</MenuItem>
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='15'>15</MenuItem>
            <MenuItem value='20'>20</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='30'>30</MenuItem>
            <MenuItem value='35'>35</MenuItem>
            <MenuItem value='40'>40</MenuItem>
            <MenuItem value='45'>45</MenuItem>
            <MenuItem value='50'>50</MenuItem>
            <MenuItem value='55'>55</MenuItem>
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

export default Step1;
