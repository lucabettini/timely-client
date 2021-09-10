import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

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

import useAuth from '../../../../hooks/useAuth';
import { getDate, getDuration } from '../../../../utils';

const TaskGrid = ({ task, timeUnit, ...props }) => {
  const token = useAuth().getToken();
  const history = useHistory();

  const [count, setCount] = useState(
    timeUnit ? Date.now() / 1000 - Date.parse(timeUnit.start_time) / 1000 : 0
  );
  const [completed, setCompleted] = useState(task.completed);
  const [loading, setLoading] = useState(false);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    setCompleted(task.completed);
  }, [task.completed]);

  useEffect(() => {
    if (timeUnit && !stop) {
      const interval = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [timeUnit, stop]);

  useEffect(() => {}, [count]);

  useEffect(() => {
    setCount(0);
    setStop(false);
  }, [task.duration]);

  const handleTimeUnit = () => {
    if (timeUnit) {
      setStop(true);
    }
    props.handleTimeUnit(task.id);
  };

  const getTime = () => {
    return getDuration(task.duration + count);
  };

  const classes = useStyles({ completed: completed });

  const handleComplete = async () => {
    setLoading(true);

    const url = completed
      ? `/api/tasks/${task.id}/incomplete`
      : `/api/tasks/${task.id}/complete`;
    try {
      if (task.recurring) {
        await axios.patch(`/api/tasks/${task.id}/recurring/complete`, null, {
          headers: { jwt: token },
        });
        task.recurring = null;
      } else {
        await axios.patch(url, null, {
          headers: { jwt: token },
        });
      }
      if (props.setCompletedOnParent !== undefined) {
        props.setCompletedOnParent(task.id, !completed);
      } else {
        setCompleted(!completed);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Paper className={classes.paper} variant='outlined'>
        <Grid container item className={classes.container} alignItems='center'>
          <Hidden lgUp>
            <Grid item xs={2}>
              {loading ? (
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
              {loading ? (
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
