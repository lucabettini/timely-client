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
import LoopIcon from '@material-ui/icons/Loop';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const getDate = (date) => {
  return Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

const getDuration = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = Math.floor(totalSeconds % 60);

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
};

const TaskGrid = ({ task, ...props }) => {
  const token = useAuth().getToken();

  const [completed, setCompleted] = useState(task.completed);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCompleted(task.completed);
  }, [task.completed]);

  const classes = useStyles({ color: task.color, completed: completed });

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
      <Hidden mdDown>
        <Paper className={classes.paper} variant='outlined'>
          <Grid
            container
            item
            className={classes.container}
            alignItems='center'
          >
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
              <Typography variant='body1' className={classes.name}>
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
                    <IconButton className={classes.icon}>
                      <PlayCircleFilledIcon color='primary' />
                    </IconButton>
                  </Grid>

                  <Grid item xs={5}>
                    <Typography variant='body2' className={classes.duration}>
                      {getDuration(task.duration)}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Hidden>

      <Hidden lgUp>
        <Paper className={classes.paper} variant='outlined'>
          <Grid
            container
            item
            className={classes.container}
            alignItems='center'
          >
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
              <Typography variant='body1' className={classes.name}>
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
                  <IconButton className={classes.icon}>
                    <PlayCircleFilledIcon color='primary' />
                  </IconButton>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='body2' className={classes.duration}>
                    {getDuration(task.duration)}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Hidden>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    cursor: 'pointer',
    marginTop: theme.spacing(1),
    backgroundColor: (props) => props.completed && theme.palette.grey[200],
    border: (props) => `1px solid #${props.color}`,
  },
  container: {
    width: '100%',
    padding: theme.spacing(1),
  },
  checkbox: {
    color: (props) => `#${props.color} !important`,
    '&checked': {
      color: (props) => `#${props.color} !important`,
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
