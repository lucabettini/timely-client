import React from 'react';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import TasksScreen from './global/TasksScreen';

import { useGetActiveTimeUnitQuery } from '../../../redux/endpoints/timeUnit';
import { useGetOverdueTasksQuery } from '../../../redux/endpoints/getTasks';

const OverdueScreen = () => {
  const auth = useAuth();
  auth.authOnly();

  const { data: tasks, isSuccess: tasksAreLoaded } = useGetOverdueTasksQuery();
  const { isSuccess: timeUnitIsLoaded } = useGetActiveTimeUnitQuery();

  if (tasksAreLoaded && timeUnitIsLoaded) {
    return <TasksScreen tasks={tasks} />;
  }
  return <Loader />;
};

export default OverdueScreen;
