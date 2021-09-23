import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const InfoRow = ({ label, info }) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid
        container
        item
        xs={5}
        justifyContent='flex-end'
        className={classes.label}
      >
        <Typography variant='body1'>{label}</Typography>
      </Grid>
      <Grid
        container
        item
        xs={7}
        justifyContent='flex-start'
        className={classes.infos}
      >
        <Typography variant='body1'>{info}</Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0.8em 0',
  },
  label: {
    paddingRight: '1em',
  },
  infos: {
    paddingLeft: '1em',
    color: theme.palette.secondary.main,
  },
}));
export default InfoRow;
