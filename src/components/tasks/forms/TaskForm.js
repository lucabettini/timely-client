import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { selectNewTaskName } from '../../../redux/tasksSlice';
import useValidation from '../../../hooks/useValidation';
import CustomInput from '../../global/CustomInput';
import RecurringTaskForm from './RecurringTaskForm';
import { setDateToISO } from '../../../utils';

const TaskForm = (props) => {
  const classes = useStyles();
  const history = useHistory();

  // FIELDS THAT NEED VALIDATION OR ARE REQUIRED
  const inputName = useSelector(selectNewTaskName);
  const initialValues = {
    name: props.initialValues?.name ?? inputName,
    bucket: props.initialValues?.bucket ?? '',
    area: props.initialValues?.area ?? '',
  };
  const form = useValidation(initialValues);

  // Validation schema
  const schema = {
    name: yup.string().trim().max(40).required(),
    bucket: yup.string().trim().lowercase().max(20).required(),
    area: yup.string().trim().lowercase().max(20).required(),
  };

  // Custom input props
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

  // OPTIONAL FIELDS OR FIELDS THAT ALWAYS HAVE A VALID VALUE
  const [fields, setFields] = useState({
    description: props.initialValues?.description ?? '',
    date: props.initialValues?.scheduled_for
      ? new Date(Date.parse(props.initialValues?.scheduled_for))
      : new Date(),
    tracked: props.initialValues?.tracked ?? true,
    repeat: props?.initialValues?.recurring ? true : false,
  });

  const handleFieldsChange = (name, value) => {
    setFields({
      ...fields,
      [name]: value,
    });
  };

  // RECURRING TAKS FIELDS (PASSED DOWN AS PROPS)
  const getChoice = () => {
    if (props.initialValues?.recurring?.end_date) {
      return 'end_date';
    } else if (props.initialValues?.recurring?.occurrences_left) {
      return 'occurrences';
    } else {
      return 'forever';
    }
  };

  const [choice, setChoice] = useState(getChoice());
  const [date, setDate] = useState(
    props.initialValues?.recurring?.end_date
      ? new Date(Date.parse(props.initialValues?.recurring?.end_date))
      : new Date()
  );
  const [frequency, setFrequency] = useState(
    props.initialValues?.recurring?.frequency || 'day'
  );

  const [recurringFields, setRecurringFields] = useState({
    interval: props.initialValues?.recurring?.interval ?? 1,
    occurrences: props.initialValues?.recurring?.occurrences_left ?? 5,
  });

  const [error, setError] = useState({
    interval: false,
    occurrences: false,
  });

  const handleRecurringFieldsChange = (e) => {
    const selectedNumber = parseInt(e.target.value, 10);
    if (
      isNaN(selectedNumber) ||
      !Number.isInteger(selectedNumber) ||
      selectedNumber <= 0
    ) {
      setError({
        ...error,
        [e.target.name]: true,
      });
    } else {
      setError({
        ...error,
        [e.target.name]: false,
      });
      setRecurringFields({
        ...fields,
        [e.target.name]: e.target.value,
      });
    }
  };

  // SUBMIT FUNCTION
  const handleSubmit = async () => {
    // Set as touched and run validation on all inputs
    // that need validation
    const canSubmit = await form.onSubmit(schema);
    if (!canSubmit) return;

    // Check if there are errors in recurring fields
    if (fields.repeat && (error.interval || error.occurrences)) return;

    const values = {
      task: {
        ...form.values,
        scheduled_for: setDateToISO(fields.date),
        description: fields.description,
        tracked: fields.tracked,
      },
    };
    if (fields.repeat) {
      values.recurring = {
        ...recurringFields,
        date,
        frequency,
        choice,
      };
    }
    props.handleSubmit(values);
  };

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      className={classes.container}
    >
      {/* <Grid item xs={10} sm={6} lg={3} className={classes.item}> */}
      <form
        noValidate
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={classes.form}
      >
        <Paper className={classes.paper}>
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
                    value={fields.date}
                    style={{ width: '100%' }}
                    onChange={(date) => handleFieldsChange('date', date)}
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
                onChange={(e) =>
                  handleFieldsChange('description', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fields.tracked}
                    onChange={() =>
                      handleFieldsChange('tracked', !fields.tracked)
                    }
                    name='tracked'
                    color='secondary'
                  />
                }
                label='Track the time of this task'
                className={fields.tracked ? null : classes.trackedLabelOff}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fields.repeat}
                    onChange={() =>
                      handleFieldsChange('repeat', !fields.repeat)
                    }
                    name='tracked'
                    color='secondary'
                  />
                }
                label='Repeat this task'
                className={fields.repeat ? null : classes.trackedLabelOn}
              />
            </Grid>
            {fields.repeat && (
              <RecurringTaskForm
                choice={choice}
                setChoice={setChoice}
                frequency={frequency}
                setFrequency={setFrequency}
                setDate={setDate}
                fields={recurringFields}
                handleChange={handleRecurringFieldsChange}
                error={error}
              />
            )}

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
                {props.initialValues ? 'EDIT TASK' : 'ADD TASK'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
      {/* </Grid> */}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    paddingBottom: '10vh',
    flexGrow: 1,
    margin: '10vh 10vw 10vw 0',
  },
  paper: {
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '5%',

    margin: 0,
  },
  form: {
    minWidth: '40%',
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
  trackedLabelOff: {
    color: theme.palette.grey[600],
  },
}));

export default TaskForm;
