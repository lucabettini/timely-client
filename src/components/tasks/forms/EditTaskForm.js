import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import TaskForm from './TaskForm';

const EditTaskForm = () => {
  const history = useHistory();
  const params = useParams();

  const auth = useAuth();
  auth.authOnly();
  const token = auth.getToken();

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/tasks/${params.id}`, {
          headers: { jwt: token },
        });
        console.log(data);
        setTask(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, params.id]);

  const handleRecurringSubmit = async (data, id) => {
    const values = {
      interval: data.interval,
      frequency: data.frequency,
    };
    if (data.choice === 'occurrences')
      values.occurrences_left = data.occurrences;
    if (data.choice === 'end_date') values.end_date = data.end_date;

    await axios.put(`/api/tasks/${id}/recurring`, values, {
      headers: { jwt: token },
    });
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/tasks/${params.id}`, data.task, {
        headers: { jwt: token },
      });
      console.log(res);

      if (data.recurring) handleRecurringSubmit(data.recurring, params.id);
      history.push('/home');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;

  return <TaskForm handleSubmit={handleSubmit} initialValues={task} />;
};

export default EditTaskForm;
