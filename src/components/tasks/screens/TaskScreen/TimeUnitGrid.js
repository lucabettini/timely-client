import React, { useState } from 'react';

import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getDateAndTime, getDuration } from '../../../../utils';

import EditIcon from '@material-ui/icons/Edit';
import EditTimeUnitDialog from './EditTimeUnitDialog';

const TimeUnitGrid = ({ timeUnit }) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Paper className={classes.paper} variant='outlined'>
        <Grid container className={classes.container}>
          <Grid item container alignItems='center' xs={2} sm={1}>
            {/* <Grid item xs={2}> */}

            <IconButton
              className={classes.icon}
              onClick={() => setOpenDialog(true)}
            >
              <EditIcon color='secondary' />
            </IconButton>
          </Grid>
          <Grid item container direction='column' xs={4}>
            <Typography variant='body2' className={classes.subtitle}>
              Start
            </Typography>
            <Typography variant='body2'>
              {getDateAndTime(timeUnit.start_time)}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body2' className={classes.subtitle}>
              End
            </Typography>
            <Typography variant='body2'>
              {getDateAndTime(timeUnit.end_time)}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <Typography variant='body2' className={classes.subtitle}>
              Time
            </Typography>
            <Typography variant='body2'>
              {getDuration(timeUnit.duration)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <EditTimeUnitDialog
        open={openDialog}
        setOpen={setOpenDialog}
        startTime={timeUnit.start_time}
        endTime={timeUnit.end_time}
        id={timeUnit.id}
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      marginRight: '10px',
      marginLeft: '10px',
    },
    backgroundColor: (props) => props.completed && theme.palette.grey[200],
  },
  container: {
    width: '100%',
    padding: theme.spacing(1),
  },
  subtitle: {
    fontWeight: 500,
  },
}));

export default TimeUnitGrid;
