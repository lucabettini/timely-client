import React from 'react';

import useAuth from '../hooks/useAuth';
import AddTaskInput from './AddTaskInput';

const HomeScreen = () => {
  useAuth().authOnly();

  return <AddTaskInput />;
};

export default HomeScreen;
