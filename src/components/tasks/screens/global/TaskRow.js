import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import {
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import InfoIcon from '@material-ui/icons/Info';
import LoopIcon from '@material-ui/icons/Loop';

import { getDate, getDuration } from '../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCount,
  selectTimerId,
  selectTaskId,
  stop,
} from '../../../../redux/timeUnitSlice';
import {
  useEditTimeUnitMutation,
  useGetActiveTimeUnitQuery,
  useStartTimeUnitMutation,
} from '../../../../redux/endpoints/timeUnit';
import { useToggleCompleteTaskMutation } from '../../../../redux/endpoints/editTasks';
import { useCompleteRecurringTaskMutation } from '../../../../redux/endpoints/editRecurringTasks';

const TaskRow = ({ task }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // COMPLETED STATE
  const [completed, setCompleted] = useState(task.completed);
  const [toggleCompleteTask, { isLoading: toggleIsLoading }] =
    useToggleCompleteTaskMutation();
  const [completeRecurringTask, { isLoading: completeRecurringIsLoading }] =
    useCompleteRecurringTaskMutation();

  // TIME UNIT STATE
  // Data from the server
  const { data: runningTimeUnit, isError } = useGetActiveTimeUnitQuery();
  const [startTimeUnit] = useStartTimeUnitMutation();
  const [editTimeUnit] = useEditTimeUnitMutation();
  // Data from the redux store (infos about last running timeUnit)
  const count = useSelector(selectCount);
  const timeUnitTaskId = useSelector(selectTaskId);
  const interval = useSelector(selectTimerId);
  const [initialTaskDuration, setInitialTaskDuration] = useState(task.duration);

  const classes = useStyles({ completed: completed });

  // TIME UNIT LOGIC
  // Reset the counter when the task is refetched, after a time unit is blocked
  useEffect(() => {
    if (task.id === timeUnitTaskId && task.duration !== initialTaskDuration) {
      dispatch(stop());
      setInitialTaskDuration(task.duration);
    }
  }, [task.duration, initialTaskDuration, task.id, timeUnitTaskId, dispatch]);

  const handleTimeUnit = async () => {
    const now = new Date();
    if (!runningTimeUnit?.task_id) {
      // No tasks are being tracked, start immediately
      await startTimeUnit({ taskId: task.id, startTime: now.toISOString() });
    } else if (runningTimeUnit.task_id === task.id) {
      // This task was being tracked, stop the counter immediately
      clearInterval(interval);
      await editTimeUnit({
        id: runningTimeUnit.id,
        startTime: runningTimeUnit.start_time,
        endTime: now.toISOString(),
      });
    } else {
      // Another task was being tracked, stop the counter before
      // starting this one
      clearInterval(interval);
      await editTimeUnit({
        id: runningTimeUnit.id,
        startTime: runningTimeUnit.start_time,
        endTime: now.toISOString(),
      });
      await startTimeUnit({ taskId: task.id, startTime: now.toISOString() });
    }
  };

  const getTime = () => {
    if (task.id === timeUnitTaskId && initialTaskDuration === task.duration) {
      return getDuration(task.duration + count);
    }
    return getDuration(task.duration);
  };

  // COMPLETED LOGIC
  useEffect(() => {
    setCompleted(task.completed);
  }, [task.completed]);

  const handleComplete = async () => {
    if (task.recurring) {
      await completeRecurringTask(task.id);
    } else {
      await toggleCompleteTask({ id: task.id, complete: !completed });
    }
  };

  if (isError) return <Redirect push to='/error' />;

  return (
    <>
      <Paper className={classes.paper} variant='outlined'>
        <Grid container item className={classes.container} alignItems='center'>
          <Hidden lgUp>
            <Grid container item xs={12} alignItems='center'>
              <Grid item xs={2}>
                {toggleIsLoading || completeRecurringIsLoading ? (
                  <CircularProgress className={classes.loader} />
                ) : (
                  <Checkbox
                    checked={completed}
                    onChange={handleComplete}
                    className={classes.checkbox}
                    inputProps={{ 'aria-label': 'complete task' }}
                  />
                )}
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant='body1'
                  className={classes.name}
                  onClick={() => history.push(`/tasks/${task.id}`)}
                >
                  {task.name}
                </Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} alignItems='center'>
              <Grid item xs={2}>
                {task.recurring && <LoopIcon className={classes.loop} />}
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant='body2'
                  className={classes.bucket}
                  onClick={() =>
                    history.push(`/bucket/${task.area}/${task.bucket}`)
                  }
                >
                  {task.bucket}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='body2' className={classes.date}>
                  {getDate(task.scheduled_for)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Hidden smUp>
                  <IconButton
                    color='secondary'
                    onClick={() => history.push(`/tasks/${task.id}`)}
                  >
                    <InfoIcon />
                  </IconButton>
                </Hidden>
                <Hidden xsDown>
                  <Button
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={() => history.push(`/tasks/${task.id}`)}
                  >
                    SEE MORE
                  </Button>
                </Hidden>
              </Grid>
            </Grid>

            {task.tracked && (
              <Grid container item xs={12} alignItems='center'>
                <Grid item xs={2}>
                  <IconButton className={classes.icon} onClick={handleTimeUnit}>
                    {task.id === timeUnitTaskId && runningTimeUnit?.task_id ? (
                      <PauseCircleFilledIcon color='secondary' />
                    ) : (
                      <PlayCircleFilledIcon color='primary' />
                    )}
                  </IconButton>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='body2' className={classes.duration}>
                    {getTime()}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Hidden>

          <Hidden mdDown>
            <Grid item xs={1} container alignItems='center'>
              {toggleIsLoading || completeRecurringIsLoading ? (
                <CircularProgress className={classes.loader} />
              ) : (
                <Checkbox
                  checked={completed}
                  onChange={handleComplete}
                  className={classes.checkbox}
                  inputProps={{ 'aria-label': 'complete task' }}
                />
              )}
              {task.recurring && <LoopIcon className={classes.loopLg} />}
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant='body1'
                className={classes.name}
                onClick={() => history.push(`/tasks/${task.id}`)}
              >
                {task.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() =>
                history.push(`/bucket/${task.area}/${task.bucket}`)
              }
            >
              <Typography variant='body2' className={classes.bucket}>
                {task.bucket}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2' className={classes.date}>
                {getDate(task.scheduled_for)}
              </Typography>
            </Grid>

            <Grid item container alignItems='center' xs={3}>
              <Grid item xs={2}>
                {task.tracked && (
                  <IconButton className={classes.icon} onClick={handleTimeUnit}>
                    {task.id === timeUnitTaskId && runningTimeUnit?.task_id ? (
                      <PauseCircleFilledIcon color='secondary' />
                    ) : (
                      <PlayCircleFilledIcon color='primary' />
                    )}
                  </IconButton>
                )}
              </Grid>

              <Grid item xs={5}>
                {task.tracked && (
                  <Typography variant='body2' className={classes.duration}>
                    {getTime()}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={5}>
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  onClick={() => history.push(`/tasks/${task.id}`)}
                >
                  SEE MORE
                </Button>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    backgroundColor: (props) => props.completed && theme.palette.grey[200],
  },
  container: {
    width: '100%',
    padding: theme.spacing(1),
  },
  checkbox: {
    color: `${theme.palette.primary.main} !important`,
    '&checked': {
      color: `${theme.palette.primary.main} !important`,
    },
  },
  icon: {
    padding: '10px',
  },
  loop: {
    marginLeft: '9px',
    color: theme.palette.secondary.main,
  },
  loopLg: {
    color: theme.palette.secondary.main,
  },
  name: {
    fontWeight: 500,
    cursor: 'pointer',
  },
  date: {
    paddingTop: '4px',
    paddingLeft: '12px',
    fontWeight: 500,
  },
  duration: {
    paddingTop: '5px',
    fontWeight: 500,
  },
  bucket: {
    padding: '2px 5px 0 5px',
    marginBottom: 0,
    borderRadius: '5px',
    backgroundColor: theme.palette.secondary.main,
    color: '#ffff',
    display: 'inline',
    cursor: 'pointer',
  },
  loader: {
    width: '20px !important',
    height: '20px !important',
    marginLeft: '12px',
    marginTop: '9px',
  },
}));

export default TaskRow;
