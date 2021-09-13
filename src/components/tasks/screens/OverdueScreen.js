import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import TasksScreen from './global/TasksScreen';

import { useGetActiveTimeUnitQuery } from '../../../redux/endpoints/timeUnit';
import { useGetOverdueTasksQuery } from '../../../redux/endpoints/getTasks';

const OverdueScreen = () => {
  const auth = useAuth();
  auth.authOnly();

  const {
    data: tasks,
    isSuccess: tasksAreLoaded,
    isError,
  } = useGetOverdueTasksQuery();
  const { isSuccess: timeUnitIsLoaded, isError: isTimeUnitError } =
    useGetActiveTimeUnitQuery();

  if (tasksAreLoaded && timeUnitIsLoaded) {
    return <TasksScreen tasks={tasks} />;
  }

  if (isError || isTimeUnitError) return <Redirect push to='/error' />;

  return <Loader />;
};

export default OverdueScreen;
