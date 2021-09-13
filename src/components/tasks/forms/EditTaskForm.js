import React from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import {
  useAddRecurringMutation,
  useDeleteRecurringMutation,
  useEditRecurringMutation,
} from '../../../redux/endpoints/editRecurringTasks';
import { useEditTaskMutation } from '../../../redux/endpoints/editTasks';
import { useGetTaskByIdQuery } from '../../../redux/endpoints/getTasks';
import { setDateToISO } from '../../../utils';
import Loader from '../../global/Loader';
import TaskForm from './TaskForm';

const EditTaskForm = () => {
  const history = useHistory();
  const params = useParams();

  const auth = useAuth();
  auth.authOnly();

  const { data: task, isSuccess, isError } = useGetTaskByIdQuery(params.id);
  const [editTask, { isLoading }] = useEditTaskMutation();
  const [editRecurring, { editRecurringIsLoading }] =
    useEditRecurringMutation();
  const [addRecurring, { addRecurringIsLoading }] = useAddRecurringMutation();
  const [deleteRecurring, { deleteRecurringIsLoading }] =
    useDeleteRecurringMutation();

  const handleRecurringSubmit = async (data, id) => {
    const values = {
      interval: data.interval,
      frequency: data.frequency,
    };
    if (data.choice === 'occurrences')
      values.occurrences_left = data.occurrences;
    if (data.choice === 'end_date') values.end_date = setDateToISO(data.date);

    if (!task.recurring) {
      await addRecurring({ id, values });
    } else {
      await editRecurring({ id, values });
    }
  };

  const handleSubmit = async (data) => {
    await editTask({ id: params.id, values: data.task });
    if (data.recurring) await handleRecurringSubmit(data.recurring, params.id);
    if (task.recurring && !data.recurring) await deleteRecurring(params.id);
    history.goBack();
  };

  if (
    !isSuccess ||
    isLoading ||
    editRecurringIsLoading ||
    addRecurringIsLoading ||
    deleteRecurringIsLoading
  )
    return <Loader />;

  if (isError) return <Redirect push to='/error' />;

  return <TaskForm handleSubmit={handleSubmit} initialValues={task} />;
};

export default EditTaskForm;
