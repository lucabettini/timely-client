import { Grid, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../hooks/useAuth';
import AddTaskInput from './AddTaskInput';
import Loader from './Loader';
import TaskGrid from './task/TaskGrid';

const BucketScreen = () => {
  const classes = useStyles();

  const params = useParams();
  const auth = useAuth();
  auth.authOnly();
  const token = auth.getToken();

  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [choice, setChoice] = useState('notCompleted');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/tasks/bucket/?area=${encodeURIComponent(
            params.area
          )}&bucket=${encodeURIComponent(params.bucket)}`,
          {
            headers: { jwt: token },
          }
        );
        console.log(data);
        setTasks(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.area, params.bucket, token]);

  const handleChoice = (e, value) => {
    if (value !== null) setChoice(value);
  };

  const getTasks = (choice) => {
    switch (choice) {
      case 'completed':
        return tasks.filter((task) => {
          return task.completed;
        });
      case 'notCompleted':
        return tasks.filter((task) => {
          return !task.completed;
        });
      default:
        return tasks;
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <AddTaskInput />
      <Grid container direction='column' alignItems='center'>
        <Typography variant='h2' className={classes.name} color='secondary'>
          {params.bucket.toUpperCase()}
        </Typography>
        <ToggleButtonGroup
          className={classes.buttonGroup}
          value={choice}
          size='small'
          exclusive
          onChange={handleChoice}
          aria-label='choose tasks'
        >
          <ToggleButton
            value='notCompleted'
            aria-label='active'
            className={classes.button}
          >
            ACTIVE ({getTasks('notCompleted').length})
          </ToggleButton>
          <ToggleButton
            value='completed'
            aria-label='completed'
            className={classes.button}
          >
            COMPLETED ({getTasks('completed').length})
          </ToggleButton>
          <ToggleButton value='all' aria-label='all' className={classes.button}>
            ALL ({tasks.length})
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      {getTasks(choice).map((task) => (
        <TaskGrid
          task={task}
          key={task.id}
          setCompletedOnParent={(id, value) => {
            setTasks((tasks) =>
              tasks.map((task) => {
                if (task.id === id) {
                  task.completed = value;
                }
                return task;
              })
            );
          }}
        />
      ))}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  name: {
    marginTop: '25px',
    marginBottom: '10px',
  },
  buttonGroup: {
    backgroundColor: theme.palette.secondary.light,
    marginBottom: theme.spacing(4),
  },
  button: {
    color: '#fafafa !important',
  },
}));

export default BucketScreen;
