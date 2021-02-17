import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const Step1 = () => {
  // const classes = useStyles();
  // const [time, setTime] = React.useState('');

  // const handleChange = (event) => {
  //   setTime(event.target.value);
  // };
  return (
    <div>
      <label htmlFor='recipe-name'>Name of Recipe</label>
      <br />
      <input
        type='text'
        name='recipe-name'
        placeholder='Enter name of recipe'
      />
      <br />

      <label htmlFor='no-portions'>Number of portions</label>
      <br />
      <input
        type='number'
        name='no-portions'
        placeholder='Enter number of portions'
      />
      <br />

      <label htmlFor='estimated-time'>Estimated time</label>
      <div>
        <select name='estimated-time'>
          <option value='1'>1</option>
          <option value='1.5'>1,5</option>
          <option value='2'>2</option>
          <option value='2.5'>2,5</option>
          <option value='3'>3</option>
          <option value='3.5'>3,5</option>
          <option value='4'>4</option>
          <option value='4.5'>4,5</option>
          <option value='5'>5</option>
        </select>
        <span>hours</span>

        <select name='estimated-time'>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
          <option value='25'>25</option>
          <option value='30'>30</option>
          <option value='35'>35</option>
          <option value='40'>40</option>
          <option value='45'>45</option>
          <option value='50'>50</option>
          <option value='55'>55</option>
        </select>
        <span>minutes</span>
      </div>

      <br />

      {/* 
      <FormControl variant='outlined' className={classes.formControl}>
        <label htmlFor='demo-simple-select-outlined-label'>
          Number of portions:
        </label>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={time}
          onChange={handleChange}
          label='Time'
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>

          <MenuItem value={2}>2 (two)</MenuItem>
          <MenuItem value={4}>4 (four)</MenuItem>
          <MenuItem value={6}>6 (six)</MenuItem>
          <MenuItem value={8}>8 (eight)</MenuItem>
        </Select>
      </FormControl>
      <br />
      <label htmlFor='recipe-name'>Estimated time</label>
      <br />
      <input
        type='text'
        name='recipe-name'
        placeholder='Enter name of recipe'
      />*/}
    </div>
  );
};

export default Step1;
