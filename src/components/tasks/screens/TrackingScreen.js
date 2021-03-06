import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';

import TasksScreen from './global/TasksScreen';
import { useGetOpenTasksQuery } from '../../../redux/endpoints/getTasks';
import { useGetActiveTimeUnitQuery } from '../../../redux/endpoints/timeUnit';

const TrackingScreen = () => {
  const auth = useAuth();
  auth.authOnly();

  const {
    data: tasks,
    isSuccess: tasksAreLoaded,
    isError,
  } = useGetOpenTasksQuery();
  const {
    data: timeUnit,
    isSuccess: timeUnitIsLoaded,
    isError: isTimeUnitError,
  } = useGetActiveTimeUnitQuery();

  if (tasksAreLoaded && timeUnitIsLoaded) {
    return <TasksScreen tasks={tasks} timeUnit={timeUnit} />;
  }

  if (isError || isTimeUnitError) return <Redirect push to='/error' />;

  return <Loader />;
};

export default TrackingScreen;
