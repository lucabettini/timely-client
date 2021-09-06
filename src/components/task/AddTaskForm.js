import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader';
import TaskForm from './TaskForm';

const AddTaskForm = () => {
  const history = useHistory();

  const auth = useAuth();
  auth.authOnly();
  const token = auth.getToken();

  const [status, setStatus] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setStatus('loading');
      const res = await axios.post('/api/tasks', data, {
        headers: { jwt: token },
      });
      console.log(res);
      history.push('/home');
    } catch (error) {
      console.log(error);
    }
  };

  if (status === 'loading') return <Loader />;

  return <TaskForm handleSubmit={handleSubmit} />;
};

export default AddTaskForm;
