import {
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React from 'react';

const RecurringTaskForm = ({
  choice,
  setChoice,
  frequency,
  setFrequency,
  setDate,
  fields,
  handleChange,
  error,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item container xs={12}>
        <Typography variant='subtitle1'>Repeat every </Typography>
        <TextField
          aria-label='interval'
          name='interval'
          type='number'
          defaultValue='1'
          size='small'
          error={error.interval}
          className={classes.interval}
          onChange={handleChange}
        />
        <FormControl className={classes.formControl}>
          <Select
            name='frequency'
            aria-label='frequency'
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value={'day'}>day{fields.interval > 1 && 's'}</MenuItem>
            <MenuItem value={'week'}>week</MenuItem>
            <MenuItem value={'month'}>month</MenuItem>
            <MenuItem value={'year'}>year</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item container xs={12}>
        <FormControl component='fieldset'>
          <RadioGroup
            aria-label='gender'
            name='gender1'
            onChange={(e) => setChoice(e.target.value)}
            value={choice}
          >
            <FormControlLabel
              value='forever'
              control={<Radio />}
              label='Forever'
            />
            <Grid container alignItems='center'>
              <FormControlLabel
                value='occurrences'
                control={<Radio />}
                label='For'
              />
              <TextField
                aria-label='occurrences'
                name='occurrences'
                type='number'
                defaultValue='5'
                onChange={handleChange}
                size='small'
                className={classes.occurrences}
                error={error.occurrences}
                disabled={choice !== 'occurrences'}
              />
              <Typography variant='subtitle1'>times</Typography>
            </Grid>
            <Grid container justifyContent='flex-start'>
              <Grid item xs={3}>
                <FormControlLabel
                  value='end_date'
                  control={<Radio />}
                  label='Until'
                />
              </Grid>
              <Grid items xs={9}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justifyContent='space-around'>
                    <KeyboardDatePicker
                      disableToolbar
                      disabled={choice !== 'end_date'}
                      name='end_date'
                      variant='inline'
                      format='dd/MM/yyyy'
                      value={fields.end_date}
                      onChange={(date) => setDate(date.toISOString())}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
};

const useStyles = makeStyles({
  interval: {
    width: '45px',
    paddingLeft: '5px',
    marginRight: '5px',
    marginTop: '3px',
  },
  occurrences: {
    width: '45px',
    marginRight: '3px',
    marginTop: '5px',
  },
});

export default RecurringTaskForm;