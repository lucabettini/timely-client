import React, { useState } from 'react';

import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  useDeleteTimeUnitMutation,
  useEditTimeUnitMutation,
} from '../../../../redux/timely';

import Loader from '../../../global/Loader';

const EditTimeUnitDialog = ({ open, setOpen, ...props }) => {
  const classes = useStyles();

  const [destroy, setDestroy] = useState(false);

  const [startTime, setStartTime] = useState(new Date(props.startTime));
  const [endTime, setEndTime] = useState(new Date(props.endTime));

  const [editTimeUnit, { isLoading: editIsLoading }] =
    useEditTimeUnitMutation();
  const [deleteTimeUnit, { isLoading: deleteIsLoading }] =
    useDeleteTimeUnitMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    await editTimeUnit({
      id: props.id,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteTimeUnit(props.id);
    setDestroy(false);
    setOpen(false);
  };

  if (editIsLoading || deleteIsLoading) return <Loader />;

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setDestroy(false);
      }}
    >
      {!destroy && (
        <form
          noValidate
          autoComplete='off'
          onSubmit={handleEdit}
          className={classes.dialog}
        >
          <DialogTitle color='secondary'>Edit time unit </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.text}>
              Enter new values for this time unit or click{' '}
              <ButtonBase
                component='a'
                className={classes.here}
                onClick={() => setDestroy(true)}
              >
                here
              </ButtonBase>{' '}
              to delete it
            </DialogContentText>
            <Typography className={classes.label}>Start time: </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <Grid item xs={5}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='dd/MM/yyyy'
                    value={startTime}
                    onChange={(date) => setStartTime(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change start date',
                    }}
                  />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                  <KeyboardTimePicker
                    value={startTime}
                    onChange={(date) => setStartTime(date)}
                    views={['hours', 'minutes', 'seconds']}
                    KeyboardButtonProps={{
                      'aria-label': 'change start time',
                    }}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>

            <Typography className={classes.label}>End time: </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <Grid item xs={5}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='dd/MM/yyyy'
                    value={endTime}
                    onChange={(date) => setEndTime(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change end date',
                    }}
                  />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                  <KeyboardTimePicker
                    value={endTime}
                    onChange={(date) => setEndTime(date)}
                    views={['hours', 'minutes', 'seconds']}
                    KeyboardButtonProps={{
                      'aria-label': 'change end time',
                    }}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button onClick={() => setOpen(false)} color='secondary'>
              CANCEL
            </Button>
            <Button
              onClick={handleEdit}
              color='secondary'
              disabled={startTime.getTime() > endTime.getTime()}
            >
              CHANGE
            </Button>
          </DialogActions>
        </form>
      )}
      {destroy && (
        <form noValidate autoComplete='off' onSubmit={handleDelete}>
          <DialogTitle color='secondary'>Delete Time Unit </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.text}>
              Are you sure? This action cannot be undone
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button onClick={() => setDestroy(false)} color='secondary'>
              CANCEL
            </Button>

            <Button onClick={handleDelete} color='secondary'>
              CONFIRM
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  text: {
    paddingRight: `${theme.spacing(4)}px`,
  },
  here: {
    marginBottom: '3px',
    color: theme.palette.secondary.main,
  },
  label: {
    fontWeight: 500,
    marginTop: theme.spacing(2),
  },
}));

export default EditTimeUnitDialog;
