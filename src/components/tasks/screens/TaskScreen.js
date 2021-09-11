import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import TaskInfo from './global/TaskInfo';
import { getDate, getDuration } from '../../../utils';
import { useGetTaskByIdQuery } from '../../../redux/timely';
import TimeUnitGrid from './TaskScreen/TimeUnitGrid';

const TaskScreen = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const auth = useAuth();
  auth.authOnly();

  const { data: task, isSuccess: taskIsLoaded } = useGetTaskByIdQuery(
    params.id
  );

  const recurringInfos = () => {
    const getFrequency = (interval, frequency) => {
      if (interval > 1) return `${interval} ${frequency}s`;
      return frequency;
    };

    let info = `Every ${getFrequency(
      task.recurring.interval,
      task.recurring.frequency
    )}`;

    if (task.recurring.end_date)
      info.concat(` until ${getDate(task.recurring.end_date)}`);
    if (task.recurring.occurrences_left)
      info.concat(`(${task.recurring.occurrences_left} times remaining)`);

    return info;
  };

  console.log(task);

  if (taskIsLoaded) {
    return (
      <Grid container direction='column' alignItems='center'>
        <Typography variant='h4' className={classes.name} color='secondary'>
          {task.name.toUpperCase()}{' '}
          <IconButton
            onClick={() => history.push(`/tasks/${task.id}/edit`)}
            className={classes.edit}
          >
            <EditIcon color='secondary' />
          </IconButton>
        </Typography>
        <TaskInfo label='Due date' info={getDate(task.scheduled_for)} />
        <TaskInfo label='Area' info={task.area} />
        <TaskInfo label='Bucket' info={task.bucket} />
        <TaskInfo
          label='Status'
          info={task.completed ? 'Active' : 'Completed'}
        />
        {task.description && (
          <TaskInfo label='Description' info={task.description} />
        )}
        {task.tracked && (
          <>
            <TaskInfo label='Tracked' info={task.timeUnitsCount + ' times'} />
            <TaskInfo
              label='Total time tracked'
              info={getDuration(task.duration)}
            />
          </>
        )}
        {task.recurring && <TaskInfo label='Repeat' info={recurringInfos()} />}
        <Grid container className={classes.timeUnits}>
          {task.timeUnitsCount > 0 &&
            task.time_units
              .filter((timeUnit) => !timeUnit.end_date)
              .map((timeUnit) => {
                return (
                  <Grid item xs={12} lg={6}>
                    <TimeUnitGrid timeUnit={timeUnit} />
                  </Grid>
                );
              })}
        </Grid>
      </Grid>
    );
  }

  return <Loader />;
};

const useStyles = makeStyles((theme) => ({
  name: {
    paddingBottom: '2em',
    paddingTop: '1em',
  },
  edit: {
    marginBottom: '5px',
    opacity: '0.5',
    '&:hover': {
      opacity: 1,
    },
  },
  timeUnits: {
    marginTop: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
  },
}));

export default TaskScreen;
