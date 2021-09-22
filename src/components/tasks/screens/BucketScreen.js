import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { Grid, IconButton, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';

import useAuth from '../../../hooks/useAuth';
import AddTaskInput from './global/AddTaskInput';
import Loader from '../../global/Loader';
import TaskRow from './global/TaskRow';
import EditDialog from './global/EditDialog';
import { useGetTasksByBucketQuery } from '../../../redux/endpoints/getTasks';
import { useGetActiveTimeUnitQuery } from '../../../redux/endpoints/timeUnit';

const BucketScreen = () => {
  const classes = useStyles();
  const params = useParams();

  const auth = useAuth();
  auth.authOnly();

  const {
    data: tasks,
    isSuccess,
    isError,
  } = useGetTasksByBucketQuery({
    area: params.area,
    bucket: params.bucket,
  });
  const { isSuccess: timeUnitIsLoaded, isError: isTimeUnitError } =
    useGetActiveTimeUnitQuery();

  const [choice, setChoice] = useState('notCompleted');
  const [openDialog, setOpenDialog] = useState(false);

  const handleChoice = (e, value) => {
    if (value !== null) setChoice(value);
  };

  const getTasks = (choice) => {
    switch (choice) {
      case 'completed':
        return tasks.filter((task) => {
          return task.completed;
        });
      case 'notCompleted':
        return tasks.filter((task) => {
          return !task.completed;
        });
      default:
        return tasks;
    }
  };

  if (isError || isTimeUnitError) return <Redirect push to='/error' />;

  if (!isSuccess || !timeUnitIsLoaded) return <Loader />;

  return (
    <>
      <AddTaskInput />
      <Grid container direction='column' alignItems='center'>
        <Typography variant='h2' className={classes.name} color='secondary'>
          {params.bucket.toUpperCase()}{' '}
          <IconButton size='small' onClick={() => setOpenDialog(true)}>
            <EditIcon color='secondary' className={classes.edit} />
          </IconButton>
        </Typography>
        <ToggleButtonGroup
          className={classes.buttonGroup}
          value={choice}
          size='small'
          exclusive
          onChange={handleChoice}
          aria-label='choose tasks'
        >
          <ToggleButton
            value='notCompleted'
            aria-label='active'
            className={classes.button}
          >
            ACTIVE ({getTasks('notCompleted').length})
          </ToggleButton>
          <ToggleButton
            value='completed'
            aria-label='completed'
            className={classes.button}
          >
            COMPLETED ({getTasks('completed').length})
          </ToggleButton>
          <ToggleButton value='all' aria-label='all' className={classes.button}>
            ALL ({tasks.length})
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      {getTasks(choice).map((task) => (
        <TaskRow task={task} key={task.id} />
      ))}
      <EditDialog
        open={openDialog}
        setOpen={setOpenDialog}
        name='bucket'
        delete={true}
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  name: {
    marginTop: '25px',
    marginBottom: '10px',
  },
  buttonGroup: {
    backgroundColor: theme.palette.secondary.light,
    marginBottom: theme.spacing(4),
  },
  button: {
    color: '#fafafa !important',
  },
  edit: {
    opacity: '0.5',
    '&:hover': {
      opacity: 1,
    },
  },
}));

export default BucketScreen;
