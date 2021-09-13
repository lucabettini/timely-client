import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import TasksScreen from './global/TasksScreen';
import { useGetTodayTasksQuery } from '../../../redux/endpoints/getTasks';
import { useGetActiveTimeUnitQuery } from '../../../redux/endpoints/timeUnit';

const HomeScreen = () => {
  const auth = useAuth();
  auth.authOnly();

  const { isSuccess: timeUnitIsLoaded, isError: isTimeUnitError } =
    useGetActiveTimeUnitQuery();
  const {
    data: tasks,
    isSuccess: tasksAreLoaded,
    isError,
  } = useGetTodayTasksQuery();

  if (tasksAreLoaded && timeUnitIsLoaded) {
    return <TasksScreen tasks={tasks} />;
  }

  if (isError || isTimeUnitError) return <Redirect push to='/error' />;

  return <Loader />;
};

export default HomeScreen;
