import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import TaskInfo from './global/TaskInfo';
import { getDate, getDuration } from '../../../utils';

const TaskScreen = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const auth = useAuth();
  const token = auth.getToken();
  auth.authOnly();

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/tasks/${params.id}`, {
          headers: { jwt: token },
        });
        console.log(data);
        setTask(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token, params.id]);

  const recurringInfos = () => {
    const getFrequency = (interval, frequency) => {
      if (interval > 1) return `${interval} ${frequency}s`;
      return frequency;
    };

    let info = `Every ${getFrequency(
      task.recurring.interval,
      task.recurring.frequency
    )}`;

    if (task.recurring.end_date)
      info.concat(` until ${getDate(task.recurring.end_date)}`);
    if (task.recurring.occurrences_left)
      info.concat(`(${task.recurring.occurrences_left} times remaining)`);

    return info;
  };

  if (loading) return <Loader />;

  return (
    <Grid container direction='column' alignItems='center'>
      <Typography variant='h4' className={classes.name} color='secondary'>
        {task.name.toUpperCase()}{' '}
        <IconButton
          onClick={() => history.push(`/tasks/${task.id}/edit`)}
          className={classes.edit}
        >
          <EditIcon color='secondary' />
        </IconButton>
      </Typography>
      <TaskInfo label='Due date' info={getDate(task.scheduled_for)} />
      <TaskInfo label='Area' info={task.area} />
      <TaskInfo label='Bucket' info={task.bucket} />
      <TaskInfo label='Status' info={task.completed ? 'Active' : 'Completed'} />
      {task.description && (
        <TaskInfo label='Description' info={task.description} />
      )}
      {task.tracked && (
        <>
          <TaskInfo label='Tracked' info={task.timeUnitsCount + ' times'} />
          <TaskInfo
            label='Total time tracked'
            info={getDuration(task.duration)}
          />
        </>
      )}
      {task.recurring && <TaskInfo label='Repeat' info={recurringInfos()} />}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  name: {
    paddingBottom: '2em',
    paddingTop: '1em',
  },
  edit: {
    marginBottom: '5px',
    opacity: '0.5',
    '&:hover': {
      opacity: 1,
    },
  },
}));

export default TaskScreen;
