import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { selectNewTaskName } from '../../redux/tasksSlice';
import useForm from '../../hooks/useForm';
import CustomInput from '../CustomInput';

import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ColorPicker } from 'material-ui-color';

const TaskForm = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState('#ffff');

  const inputName = useSelector(selectNewTaskName);
  const initialValues = props.initialValues ?? {
    name: inputName,
    bucket: '',
    area: '',
  };
  const form = useForm(initialValues);

  // Validation schema
  const schema = {
    name: yup.string().trim().required(),
    bucket: yup.string().trim().lowercase().required(),
    area: yup.string().trim().lowercase().required(),
  };

  const handleSubmit = async () => {
    // Set as touched and run validation on all inputs
    const canSubmit = await form.onSubmit(schema);

    if (canSubmit) {
      props.handleSubmit({
        ...form.values,
        color: selectedColor.hex,
        scheduled_for: selectedDate.toISOString(),
        description: description,
      });
    }
  };

  // INPUT PROPS
  const inputProps = (name) => {
    return {
      name,
      label: name.charAt(0).toUpperCase() + name.substring(1),
      handleChange: form.onChange,
      handleBlur: form.onBlur,
      isValid: form.isValid(name),
      value: form.values[name],
    };
  };

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      className={classes.container}
    >
      <Grid item xs={10} sm={6} lg={3} className={classes.item}>
        <form
          noValidate
          autoComplete='off'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Paper className={classes.form}>
            <Grid container direction='column' spacing={3}>
              <Grid item xs={12}>
                <CustomInput
                  schema={schema.name}
                  style={{ width: '100%' }}
                  {...inputProps('name')}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  schema={schema.bucket}
                  style={{ width: '100%' }}
                  {...inputProps('bucket')}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  schema={schema.area}
                  style={{ width: '100%' }}
                  {...inputProps('area')}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justifyContent='space-around'>
                    <KeyboardDatePicker
                      disableToolbar
                      name='date'
                      variant='inline'
                      format='dd/MM/yyyy'
                      margin='normal'
                      label='Date'
                      value={selectedDate}
                      style={{ width: '100%' }}
                      onChange={(date) => setSelectedDate(date)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: '100%', resize: 'vertical' }}
                  multiline
                  inputProps={{ className: classes.textarea }}
                  label='Description (optional)'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                justifyContent='space-between'
                alignItems='flex-end'
              >
                <p className={classes.text}>Color (optional)</p>
                <ColorPicker
                  disableAlpha
                  hideTextfield
                  value={selectedColor.value}
                  onChange={(e) => setSelectedColor(e)}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent='space-between'
                className={classes.buttons}
              >
                <Button
                  variant='contained'
                  color='secondary'
                  size='large'
                  onClick={() => history.goBack()}
                >
                  CANCEL
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                >
                  ADD TASK
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    paddingBottom: '20vh',
    flexGrow: 1,
  },
  form: {
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '5%',
  },
  textarea: {
    resize: 'vertical',
  },
  buttons: {
    marginTop: theme.spacing(5),
  },
  text: {
    fontSize: '1.2em',
    color: theme.palette.grey[600],
    marginBottom: '2px',
  },
  colorPicker: {
    marginBottom: 0,
  },
}));

export default TaskForm;
