import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import TaskForm from './TaskForm';

const AddTaskForm = () => {
  const history = useHistory();

  const auth = useAuth();
  auth.authOnly();
  const token = auth.getToken();

  const [status, setStatus] = useState(null);

  const handleRecurringSubmit = async (data, id) => {
    const values = {
      interval: data.interval,
      frequency: data.frequency,
    };
    if (data.choice === 'occurrences') values.occurrences = data.occurrences;
    if (data.choice === 'end_date') values.end_date = data.end_date;

    await axios.post(`/api/tasks/${id}/recurring`, values, {
      headers: { jwt: token },
    });
  };

  const handleSubmit = async (data) => {
    try {
      setStatus('loading');
      const res = await axios.post('/api/tasks', data.task, {
        headers: { jwt: token },
      });
      console.log(res);

      if (data.recurring) handleRecurringSubmit(data.recurring, res.data.id);
      history.push('/home');
    } catch (error) {
      console.log(error);
    }
  };

  if (status === 'loading') return <Loader />;

  return <TaskForm handleSubmit={handleSubmit} />;
};

export default AddTaskForm;
