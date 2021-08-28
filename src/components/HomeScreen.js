import React from 'react';

import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
  useAuth().authOnly();

  return <>You have succesfully entered a protected area. Cheers!</>;
};

export default HomeScreen;
