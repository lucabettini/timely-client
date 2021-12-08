import { Container, Typography } from '@material-ui/core';
import React from 'react';

const ErrorScreen = () => {
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
        <a href='/' style={{ color: '#0b486c' }}>
          go back and try something else
        </a>
        .
      </Typography>
      <Typography variant='body1' style={{ paddingTop: '15px' }}>
        If the problem persists, please{' '}
        <a
          href='https://lucabettini.com'
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
