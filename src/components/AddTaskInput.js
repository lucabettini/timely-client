import {
  FormControl,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
  },
  icon: {
    cursor: 'pointer',
  },
}));

function AddTaskInput() {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <FormControl className={classes.textField} variant='outlined'>
        <InputLabel htmlFor='add-task-input'>Add a new task</InputLabel>
        <OutlinedInput
          fullWidth={true}
          labelWidth={110}
          id='add-task-input'
          onChange={handleChange}
          color='primary'
          endAdornment={
            <InputAdornment position='end'>
              <LibraryAddIcon
                color='primary'
                onClick={handleSubmit}
                className={classes.icon}
              />
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
}

export default AddTaskInput;
