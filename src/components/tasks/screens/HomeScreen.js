import { makeStyles } from '@material-ui/styles';
import React from 'react';

import useAuth from '../../../hooks/useAuth';
import AddTaskInput from './global/AddTaskInput';
import Loader from '../../global/Loader';
import TaskGrid from './global/TaskGrid';
import {
  useGetActiveTimeUnitQuery,
  useGetTasksByWeekQuery,
  useStartTimeUnitMutation,
  useEditTimeUnitMutation,
} from '../../../redux/timely';

const HomeScreen = () => {
  const classes = useStyles();

  const auth = useAuth();
  auth.authOnly();

  const { data: tasks, isSuccess: tasksAreLoaded } = useGetTasksByWeekQuery();
  const { data: timeUnit, isSuccess: timeUnitIsLoaded } =
    useGetActiveTimeUnitQuery();
  const [startTimeUnit] = useStartTimeUnitMutation();
  const [editTimeUnit] = useEditTimeUnitMutation();

  const handleTimeUnit = async (taskId) => {
    const now = new Date();
    if (!timeUnit?.task_id) {
      await startTimeUnit({ taskId, startTime: now.toISOString() });
    } else if (timeUnit.task_id === taskId) {
      await editTimeUnit({
        id: timeUnit.id,
        startTime: timeUnit.start_time,
        endTime: now.toISOString(),
      });
    } else {
      // Another task was started while one was being tracked,
      // stop the first before starting the second
      await editTimeUnit({
        id: timeUnit.id,
        startTime: timeUnit.start_time,
        endTime: now.toISOString(),
      });
      await startTimeUnit({ taskId, startTime: now.toISOString() });
    }
  };

  if (tasksAreLoaded && timeUnitIsLoaded) {
    return (
      <>
        <AddTaskInput />
        <div className={classes.container}>
          {[...tasks]
            .sort((a, b) => {
              return a.completed ? 1 : -1;
            })
            .map((task) => {
              return (
                <TaskGrid
                  task={task}
                  key={task.id}
                  timeUnit={timeUnit?.task_id === task.id ? timeUnit : null}
                  handleTimeUnit={handleTimeUnit}
                />
              );
            })}
        </div>
      </>
    );
  }
  return <Loader />;
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
}));

export default HomeScreen;
