import React from 'react';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';

import TasksScreen from './global/TasksScreen';
import { useGetOpenTasksQuery } from '../../../redux/endpoints/getTasks';
import { useGetActiveTimeUnitQuery } from '../../../redux/endpoints/timeUnit';

const TrackingScreen = () => {
  const auth = useAuth();
  auth.authOnly();

  const { data: tasks, isSuccess: tasksAreLoaded } = useGetOpenTasksQuery();
  const { data: timeUnit, isSuccess: timeUnitIsLoaded } =
    useGetActiveTimeUnitQuery();

  if (tasksAreLoaded && timeUnitIsLoaded) {
    return <TasksScreen tasks={tasks} timeUnit={timeUnit} />;
  }
  return <Loader />;
};

export default TrackingScreen;
