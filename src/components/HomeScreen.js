import React from 'react';
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
  useAuth().authOnly();

  return <div>You have succesfully entered a protected area. Cheers!</div>;
};

export default HomeScreen;
