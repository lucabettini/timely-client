import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import {
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
import LoopIcon from '@material-ui/icons/Loop';

import { getDate, getDuration } from '../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCount,
  selectCount,
  selectTimerId,
  selectTaskId,
} from '../../../../redux/timeUnitSlice';
import { useToggleCompleteTaskMutation } from '../../../../redux/endpoints/editTasks';
import { useCompleteRecurringTaskMutation } from '../../../../redux/endpoints/editRecurringTasks';

const TaskGrid = ({ task, timeUnit, ...props }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [completed, setCompleted] = useState(task.completed);

  const [toggleCompleteTask, { isLoading: toggleIsLoading }] =
    useToggleCompleteTaskMutation();
  const [completeRecurringTask, { isLoading: completeRecurringIsLoading }] =
    useCompleteRecurringTaskMutation();

  const count = useSelector(selectCount);
  const timeUnitTaskId = useSelector(selectTaskId);
  const interval = useSelector(selectTimerId);

  useEffect(() => {
    setCompleted(task.completed);
  }, [task.completed]);

  useEffect(() => {
    dispatch(resetCount());
  }, [task.duration, dispatch]);

  const handleTimeUnit = () => {
    if (interval) {
      clearInterval(interval);
    }
    props.handleTimeUnit(task.id);
  };

  const getTime = () => {
    if (task.id === timeUnitTaskId) {
      return getDuration(task.duration + count);
    }
    return getDuration(task.duration);
  };

  const classes = useStyles({ completed: completed });

  const handleComplete = async () => {
    if (task.recurring) {
      await completeRecurringTask(task.id);
    } else {
      await toggleCompleteTask({ id: task.id, complete: !completed });
    }
  };

  return (
    <>
      <Paper className={classes.paper} variant='outlined'>
        <Grid container item className={classes.container} alignItems='center'>
          <Hidden lgUp>
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
            <Grid item xs={2}>
              {task.recurring && <LoopIcon className={classes.loop} />}
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2' className={classes.bucket}>
                {task.bucket}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='body2' className={classes.date}>
                {getDate(task.scheduled_for)}
              </Typography>
            </Grid>
            {task.tracked && (
              <>
                <Grid item xs={2}>
                  <IconButton className={classes.icon} onClick={handleTimeUnit}>
                    {timeUnit ? (
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
              </>
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
            <Grid item xs={2}>
              <Typography variant='body2' className={classes.bucket}>
                {task.bucket}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2' className={classes.date}>
                {getDate(task.scheduled_for)}
              </Typography>
            </Grid>
            {task.tracked && (
              <>
                <Grid item container alignItems='center' xs={3}>
                  <Grid item xs={2}>
                    <IconButton
                      className={classes.icon}
                      onClick={handleTimeUnit}
                    >
                      {timeUnit ? (
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
              </>
            )}
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
  },
  loader: {
    width: '20px !important',
    height: '20px !important',
    marginLeft: '12px',
    marginTop: '9px',
  },
}));

export default TaskGrid;
