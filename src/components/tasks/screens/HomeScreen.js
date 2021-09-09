import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import useAuth from '../../../hooks/useAuth';
import AddTaskInput from './global/AddTaskInput';
import Loader from '../../global/Loader';
import TaskGrid from './global/TaskGrid';

const HomeScreen = () => {
  const classes = useStyles();

  const auth = useAuth();
  const token = auth.getToken();
  auth.authOnly();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/tasks/week', {
          headers: { jwt: token },
        });
        // console.log(data);
        setTasks(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <Loader />;

  return (
    <>
      <AddTaskInput />
      <div className={classes.container}>
        {tasks
          .sort((a, b) => {
            return a.completed ? 1 : -1;
          })
          .map((task) => {
            return <TaskGrid task={task} key={task.id} />;
          })}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
}));

export default HomeScreen;
