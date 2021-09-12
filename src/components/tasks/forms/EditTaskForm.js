import React from 'react';
import { useHistory, useParams } from 'react-router';

import useAuth from '../../../hooks/useAuth';
import {
  useEditRecurringMutation,
  useEditTaskMutation,
} from '../../../redux/endpoints/editTasks';
import { useGetTaskByIdQuery } from '../../../redux/endpoints/getTasks';
import { setDateToISO } from '../../../utils';
import Loader from '../../global/Loader';
import TaskForm from './TaskForm';

const EditTaskForm = () => {
  const history = useHistory();
  const params = useParams();

  const auth = useAuth();
  auth.authOnly();

  const { data: task, isSuccess } = useGetTaskByIdQuery(params.id);
  const [editTask, { isLoading }] = useEditTaskMutation();
  const [editRecurring, { editRecurringIsLoading }] =
    useEditRecurringMutation();

  const handleRecurringSubmit = async (data, id) => {
    const values = {
      interval: data.interval,
      frequency: data.frequency,
    };
    if (data.choice === 'occurrences')
      values.occurrences_left = data.occurrences;
    if (data.choice === 'end_date') values.end_date = setDateToISO(data.date);

    await editRecurring({ id, values });
  };

  const handleSubmit = async (data) => {
    await editTask({ id: params.id, values: data.task });
    if (data.recurring) await handleRecurringSubmit(data.recurring, params.id);
    history.push('/home');
  };

  if (!isSuccess || isLoading || editRecurringIsLoading) return <Loader />;

  return <TaskForm handleSubmit={handleSubmit} initialValues={task} />;
};

export default EditTaskForm;
