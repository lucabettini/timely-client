import React from 'react';
import { useHistory } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import { useAddRecurringMutation } from '../../../redux/endpoints/editRecurringTasks';
import { useAddTaskMutation } from '../../../redux/endpoints/editTasks';
import Loader from '../../global/Loader';
import TaskForm from './TaskForm';

const AddTaskForm = () => {
  const history = useHistory();

  const auth = useAuth();
  auth.authOnly();

  const [addTask, { isLoading }] = useAddTaskMutation();
  const [addRecurring, { isLoading: addRecurringIsLoading }] =
    useAddRecurringMutation();

  const handleRecurringSubmit = async (data, id) => {
    const values = {
      interval: data.interval,
      frequency: data.frequency,
    };
    if (data.choice === 'occurrences')
      values.occurrences_left = data.occurrences;
    if (data.choice === 'end_date') values.end_date = data.end_date;

    await addRecurring({ id, values });
  };

  const handleSubmit = async (data) => {
    const response = await addTask(data.task).unwrap();

    if (data.recurring)
      await handleRecurringSubmit(data.recurring, response.id);
    history.goBack();
  };

  if (!isLoading && !addRecurringIsLoading)
    return <TaskForm handleSubmit={handleSubmit} />;

  return <Loader />;
};

export default AddTaskForm;
