import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router';

import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';

import useAuth from '../../../hooks/useAuth';
import {
  selectAreas,
  selectStatus,
  fetchAreas,
} from '../../../redux/tasksSlice';
import Loader from '../../global/Loader';
import EditDialog from './global/EditDialog';

const AreaScreen = () => {
  const classes = useStyles();

  const auth = useAuth();
  auth.authOnly();
  const token = auth.getToken();

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const areas = useSelector(selectAreas);
  const status = useSelector(selectStatus);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchAreas(token));
  }, [dispatch, token]);

  const handleClick = (bucketName) => {
    history.push(`/bucket/${params.area}/${encodeURIComponent(bucketName)}`);
  };

  if (status !== 'succeeded') return <Loader />;

  if (status === 'succeeded' && !areas[params.area])
    return <Redirect to='/home' push />;

  return (
    <>
      <Grid container justifyContent='center'>
        <Typography variant='h2' color='secondary' className={classes.root}>
          {params.area.toUpperCase()}{' '}
          <IconButton size='small' onClick={() => setOpenDialog(true)}>
            <EditIcon color='secondary' className={classes.edit} />
          </IconButton>
        </Typography>
      </Grid>

      <Grid container justifyContent='center' className={classes.root}>
        {Object.keys(areas[params.area]).map((bucketName) => {
          return (
            <Paper
              elevation={2}
              className={classes.paper}
              onClick={() => handleClick(bucketName)}
              key={bucketName}
            >
              <Card variant='outlined' className={classes.card}>
                <CardContent className={classes.content}>
                  <Grid container justifyContent='center'>
                    <Typography
                      variant='h4'
                      color='secondary'
                      className={classes.title}
                    >
                      {bucketName.toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent='space-around'>
                    <Typography
                      variant='body1'
                      color='secondary'
                      className={classes.count}
                    >
                      Active: {areas[params.area][bucketName].not_completed}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='secondary'
                      className={classes.count}
                    >
                      Completed: {areas[params.area][bucketName].completed}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          );
        })}
      </Grid>
      <EditDialog open={openDialog} setOpen={setOpenDialog} name='area' />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '5vh',
  },
  paper: {
    margin: 20,
    cursor: 'pointer',
  },
  card: {
    minWidth: 275,
    minHeight: 150,
    border: `1px solid ${theme.palette.secondary.light}`,
    backgroundColor: '#fafafa',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      opacity: 0.5,
    },
  },
  title: {
    paddingBottom: 30,
  },
}));

export default AreaScreen;