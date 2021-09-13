import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { PauseCircleFilled } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useGetTaskByIdQuery } from '../../redux/endpoints/getTasks';
import {
  useEditTimeUnitMutation,
  useGetActiveTimeUnitQuery,
} from '../../redux/endpoints/timeUnit';

import {
  incrementCount,
  resetCount,
  selectCount,
  selectTimerId,
  setTimerId,
  start,
} from '../../redux/timeUnitSlice';
import { getDuration } from '../../utils';

const TimeUnitBar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [editTimeUnit] = useEditTimeUnitMutation();
  const count = useSelector(selectCount);
  const interval = useSelector(selectTimerId);

  const { data: timeUnit, isSuccess: timeUnitIsLoaded } =
    useGetActiveTimeUnitQuery();
  const { data: task, isSuccess: taskIsLoaded } = useGetTaskByIdQuery(
    timeUnit.task_id
  );

  useEffect(() => {
    const initialTime =
      Date.now() / 1000 - Date.parse(timeUnit.start_time) / 1000;
    dispatch(start({ count: initialTime, id: timeUnit.task_id }));
  }, [dispatch, timeUnit]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(incrementCount());
    }, 1000);
    dispatch(setTimerId(timer));
  }, [dispatch]);

  const handleStop = async () => {
    clearInterval(interval);
    const now = new Date();
    await editTimeUnit({
      id: timeUnit.id,
      startTime: timeUnit.start_time,
      endTime: now.toISOString(),
    });
  };

  if (!taskIsLoaded || !timeUnitIsLoaded) return null;

  return (
    <AppBar position='fixed' color='secondary' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6'>{task.name.toUpperCase()}</Typography>
        <div style={{ display: 'flex' }}>
          <Typography className={classes.time} variant='h6'>
            {getDuration(count)}
          </Typography>
          <IconButton
            color='primary'
            className={classes.button}
            onClick={handleStop}
          >
            <PauseCircleFilled className={classes.icon} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - 240px)`,
      marginLeft: 240,
    },
    top: 'auto',
    bottom: 0,
  },
  icon: {
    [theme.breakpoints.up('md')]: {
      width: '56px',
      height: '56px',
    },
    width: '40px',
    height: '40px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  time: {
    alignSelf: 'center',
  },
}));

export default TimeUnitBar;
