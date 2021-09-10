import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import useAuth from '../../../hooks/useAuth';
import AddTaskInput from './global/AddTaskInput';
import Loader from '../../global/Loader';
import TaskGrid from './global/TaskGrid';
import {
  useGetActiveTimeUnitQuery,
  useStartTimeUnitMutation,
  useStopTimeUnitMutation,
} from '../../../redux/timely';

const HomeScreen = () => {
  const classes = useStyles();

  const auth = useAuth();
  const token = auth.getToken();
  auth.authOnly();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);

  const { data, isLoading } = useGetActiveTimeUnitQuery();
  const [startTimeUnit] = useStartTimeUnitMutation();
  const [stopTimeUnit] = useStopTimeUnitMutation();

  const handleTimeUnit = async (taskId) => {
    const now = new Date();
    if (!data?.task_id) {
      await startTimeUnit({ taskId, startTime: now.toISOString() });
    } else if (data.task_id === taskId) {
      await stopTimeUnit({
        id: data.id,
        startTime: data.start_time,
        endTime: now.toISOString(),
      });
    } else {
      // Another task was started while one was being tracked,
      // stop the first before starting the second
      await stopTimeUnit({
        id: data.id,
        startTime: data.start_time,
        endTime: now.toISOString(),
      });
      await startTimeUnit({ taskId, startTime: now.toISOString() });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/tasks/week', {
          headers: { jwt: token },
        });
        setTasks(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, data]);

  if (loading || isLoading) return <Loader />;

  return (
    <>
      <AddTaskInput />
      <div className={classes.container}>
        {tasks
          .sort((a, b) => {
            return a.completed ? 1 : -1;
          })
          .map((task) => {
            return (
              <TaskGrid
                task={task}
                key={task.id}
                timeUnit={data?.task_id === task.id ? data : null}
                handleTimeUnit={handleTimeUnit}
              />
            );
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
