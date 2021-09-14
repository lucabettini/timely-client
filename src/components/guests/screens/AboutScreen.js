import { Container, Typography } from '@material-ui/core';
import React from 'react';

const AboutScreen = () => {
  return (
    <Container>
      <Typography
        variant='h2'
        color='secondary'
        style={{ paddingTop: '20%', paddingBottom: '25px' }}
      >
        About Timely
      </Typography>
      <Typography variant='h5' style={{ paddingTop: '15px' }}>
        This website was created as a personal project in September 2021 by{' '}
        <a
          href='https://lucabettini.github.io/'
          rel='noopener noreferrer'
          target='_blank'
          style={{ color: '#0b486c' }}
        >
          Luca Bettini
        </a>
        .
      </Typography>
      <Typography variant='body1' style={{ paddingTop: '15px' }}>
        The frontend was made with React and Material UI, while the the API was
        created with Laravel 8 and deployed with Heroku to a completely separate
        domain.
      </Typography>
      <Typography variant='body1' style={{ paddingTop: '15px' }}>
        View the{' '}
        <a
          href='https://github.com/lucabettini/timely-client'
          rel='noopener noreferrer'
          target='_blank'
          style={{ color: '#0b486c' }}
        >
          client-side repo on github
        </a>
        , or get a look at the{' '}
        <a
          href='https://github.com/lucabettini/timely-backend'
          rel='noopener noreferrer'
          target='_blank'
          style={{ color: '#0b486c' }}
        >
          server code
        </a>
        . Both have detailed README with more infos about the development
        process and architectural choices.
      </Typography>
      <Typography
        variant='body1'
        style={{ paddingTop: '15px', paddingBottom: '15px' }}
      >
        If you liked this website and want to give me some feedback, you can
        write to me{' '}
        <a
          href='https://lucabettini.github.io/contacts.html'
          rel='noopener noreferrer'
          target='_blank'
          style={{ color: '#0b486c' }}
        >
          here
        </a>
        .
      </Typography>
    </Container>
  );
};

export default AboutScreen;
