import { Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../../redux/errorsSlice';

const ErrorScreen = () => {
  const dispatch = useDispatch();

  // Resets global state to error: false after
  // this screen is rendered.
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const preventDefault = (event) => event.preventDefault();

  return (
    <Container fixed>
      <Typography variant='h2' color='error' style={{ paddingTop: '20%' }}>
        Oops! Something went wrong
      </Typography>
      <Typography variant='body1' style={{ paddingTop: '15px' }}>
        Either we couldn't find what you are looking for or some unexpected
        black magic happened on the server.
      </Typography>
      <Typography variant='body1' style={{ paddingTop: '15px' }}>
        While we send our oompa-loompas squad to check, you can{' '}
        <a href='/home' style={{ color: '#0b486c' }} onClick={preventDefault}>
          go back and try something else
        </a>
        .
      </Typography>
      <Typography variant='body1' style={{ paddingTop: '15px' }}>
        If the problem persists, please{' '}
        <a
          href='https://lucabettini.github.io/contacts.html'
          rel='noopener noreferrer'
          target='_blank'
          style={{ color: '#0b486c' }}
        >
          let me know
        </a>
        .
      </Typography>
    </Container>
  );
};

export default ErrorScreen;
