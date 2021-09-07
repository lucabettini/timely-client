import {
  FormControl,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setNewTaskName } from '../redux/tasksSlice';
import * as yup from 'yup';

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
  const history = useHistory();
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const schema = yup.string().trim().max(40);

  const handleChange = async (e) => {
    setValue(e.target.value);
    const isValid = await schema.isValid(e.target.value);
    if (!isValid) setError(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value === '') return;

    const isValid = await schema.isValid(value);
    if (isValid) {
      dispatch(setNewTaskName(value));
      history.push('/addTask');
    }
  };

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <FormControl className={classes.textField} variant='outlined'>
        <InputLabel htmlFor='name'>Add a new task</InputLabel>
        <OutlinedInput
          fullWidth={true}
          labelWidth={110}
          id='name'
          onChange={handleChange}
          color='primary'
          error={error}
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
