import React from 'react';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import TasksScreen from './global/TasksScreen';
import { useGetTasksByWeekQuery } from '../../../redux/endpoints/getTasks';
import { useGetActiveTimeUnitQuery } from '../../../redux/endpoints/timeUnit';

const HomeScreen = () => {
  const auth = useAuth();
  auth.authOnly();

  const { isSuccess: timeUnitIsLoaded } = useGetActiveTimeUnitQuery();
  const { data: tasks, isSuccess: tasksAreLoaded } = useGetTasksByWeekQuery();

  if (tasksAreLoaded && timeUnitIsLoaded) {
    return <TasksScreen tasks={tasks} />;
  }
  return <Loader />;
};

export default HomeScreen;
