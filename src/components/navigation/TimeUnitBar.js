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
import { incrementCount, selectCount } from '../../redux/timeUnitSlice';

const TimeUnitBar = ({ timeUnit }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(incrementCount);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <AppBar position='fixed' color='secondary' className={classes.appBar}>
      <Toolbar>
        <Typography>yooo</Typography>
        <IconButton color='primary' className={classes.button}>
          <PauseCircleFilled className={classes.icon} />
        </IconButton>
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
}));

export default TimeUnitBar;
