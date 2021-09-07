import {
  Checkbox,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import LoopIcon from '@material-ui/icons/Loop';
import React from 'react';

const TaskGrid = ({ task }) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      cursor: 'pointer',
      marginTop: theme.spacing(1),
      border: `1px solid #${task.color}`,
    },
    container: {
      width: '100%',
      padding: theme.spacing(1),
    },
    checkbox: {
      color: `#${task.color} !important`,
      '&checked': {
        color: `#${task.color} !important`,
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
    bucket: {
      padding: '2px 5px 0 5px',
      marginBottom: 0,
      borderRadius: '5px',
      backgroundColor: theme.palette.secondary.main,
      color: '#ffff',
      display: 'inline',
    },
  }));

  const classes = useStyles();

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

  return (
    <>
      <Hidden xsDown>
        <Paper className={classes.paper} variant='outlined'>
          <Grid
            container
            item
            className={classes.container}
            alignItems='center'
          >
            <Grid item xs={1} container alignItems='center'>
              <Checkbox
                checked={true}
                className={classes.checkbox}
                inputProps={{ 'aria-label': 'complete task' }}
              />
              {<LoopIcon className={classes.loopLg} />}
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
                    <Typography
                      variant='body2'
                      textAlign='right'
                      className={classes.duration}
                    >
                      {getDuration(task.duration)}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Hidden>

      <Hidden smUp>
        <Paper className={classes.paper} variant='outlined'>
          <Grid
            container
            item
            className={classes.container}
            alignItems='center'
          >
            <Grid item xs={2}>
              <Checkbox
                checked={true}
                className={classes.checkbox}
                inputProps={{ 'aria-label': 'complete task' }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant='body1' className={classes.name}>
                {task.name}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {<LoopIcon className={classes.loop} />}
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
                  <Typography
                    variant='body2'
                    textAlign='right'
                    className={classes.duration}
                  >
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

export default TaskGrid;
