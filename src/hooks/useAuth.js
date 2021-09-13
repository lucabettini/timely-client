import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
  const history = useHistory();
  const [token, setToken] = useState(sessionStorage.getItem('jwt'));

  // Save jwt on sessionStorage
  const login = (jwt) => {
    sessionStorage.setItem('jwt', jwt);
    setToken(jwt);
  };

  // Clear jwt from sessionStorage and send request
  // to server to add token to blacklist
  const logout = async () => {
    await axios.post('/api/logout', null, {
      headers: { jwt: token },
    });
    sessionStorage.clear();
    setToken(null);
  };

  // Return token if present, otherwise redirect to
  // error page
  const getToken = () => {
    if (!token) {
      history.push('/login');
    }
    return token;
  };

  // Redirect user to appropriate location
  const authOnly = () => {
    if (!token) history.push('/login');
  };
  const guestOnly = () => {
    if (token) history.push('/home');
  };

  return { login, logout, getToken, authOnly, guestOnly };
};

export default useAuth;
