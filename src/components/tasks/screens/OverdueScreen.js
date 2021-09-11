import React from 'react';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import {
  useGetActiveTimeUnitQuery,
  useGetOverdueTasksQuery,
} from '../../../redux/timely';
import TasksScreen from './global/TasksScreen';

const OverdueScreen = () => {
  const auth = useAuth();
  auth.authOnly();

  const { data: tasks, isSuccess: tasksAreLoaded } = useGetOverdueTasksQuery();
  const { data: timeUnit, isSuccess: timeUnitIsLoaded } =
    useGetActiveTimeUnitQuery();

  if (tasksAreLoaded && timeUnitIsLoaded) {
    return <TasksScreen tasks={tasks} timeUnit={timeUnit} />;
  }
  return <Loader />;
};

export default OverdueScreen;
