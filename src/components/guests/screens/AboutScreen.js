import { Container, Typography, Grid } from '@material-ui/core';
import React from 'react';
import tasks from '../../../assets/tasks.png';
import sidenav from '../../../assets/sidenav.png';
import timeUnit from '../../../assets/timeUnit.png';
import { makeStyles } from '@material-ui/styles';

const AboutScreen = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography
        variant='h2'
        color='secondary'
        className={classes.padding}
        style={{ paddingTop: '20%', paddingBottom: '25px' }}
      >
        How to
      </Typography>

      <Grid container>
        <Grid item xs={12} container className={classes.paddingBottom}>
          <Grid item xs={12} md={6} container alignItems='center'>
            <Typography variant='body1' className={classes.description}>
              First and foremost, Timely is a personal digital schedule. Tasks
              can be anything, from an event to a todo note to an anniversary.
              You an add them to your schedule by specifying a name, a date and
              two categories: a larger one, called <strong>area</strong>, and
              one more specific, called <strong>bucket</strong>. Picture it like
              this: an area has many buckets, all of which can have different
              tasks.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={tasks} alt='' style={{ maxWidth: '100%' }} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} container className={classes.paddingBottom}>
          <Grid item xs={12} container justifyContent='center'>
            <img src={sidenav} alt='' />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' className={classes.description}>
              Use the sidebar to navigate between different areas, dates and to
              choose one of two special categories. The first is the{' '}
              <strong>overdue</strong> category, which shows all the tasks with
              a due date in the past which are not completed yet.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} container className={classes.paddingBottom}>
          <Grid item xs={12} container justifyContent='center'>
            <img src={timeUnit} alt='' />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' className={classes.description}>
              The second is the <strong>tracked</strong> category: click on the
              play button to immediately start a timer and start tracking a
              task. Note that you can do it multiple times for the same task,
              but you cannot track two tasks at the same time.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Typography
        variant='h2'
        color='secondary'
        className={classes.padding}
        style={{ paddingTop: '20%', paddingBottom: '25px' }}
      >
        About Timely
      </Typography>
      <Typography
        variant='h5'
        className={classes.padding}
        style={{ paddingTop: '15px' }}
      >
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
      <Typography variant='body1' className={classes.description}>
        The frontend was made with React and Material UI, while the the API was
        created with Laravel 8 and deployed with Heroku to a completely separate
        domain.
      </Typography>
      <Typography variant='body1' className={classes.description}>
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
        className={classes.description}
        style={{ paddingBottom: '50px' }}
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

const useStyles = makeStyles((theme) => ({
  description: {
    fontWeight: 400,
    fontSize: '1.4em',
    padding: theme.spacing(1),
  },
  paddingBottom: {
    paddingBottom: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(1),
  },
}));

export default AboutScreen;
