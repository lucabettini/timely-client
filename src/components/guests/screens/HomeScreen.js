import {
  Container,
  createTheme,
  ThemeProvider,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useHistory } from 'react-router';
import home from '../../../assets/home.svg';

const title = createTheme({
  typography: {
    fontFamily: '"Luckiest Guy", serif',
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
    marginTop: '15vh',
  },
  subtitle: {
    color: theme.palette.secondary.main,
  },
  button: {
    margin: '5vh 10px 0 10px',
  },
  content: {
    marginBottom: '10vh',
  },
  container: {
    minHeight: '100vh',
  },
  image: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        className={classes.container}
      >
        <Grid
          container
          item
          xs={12}
          lg={6}
          direction='column'
          alignItems='center'
          className={classes.content}
        >
          <ThemeProvider theme={title}>
            <Typography variant='h1' className={classes.title}>
              TIMELY
            </Typography>
            <Typography
              variant='h5'
              className={classes.subtitle}
              textAlign='center'
            >
              TIME TRACKER AND DIGITAL SCHEDULE
            </Typography>
          </ThemeProvider>
          <Grid item container xs={12} justifyContent='center'>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              className={classes.button}
              onClick={() => history.push('/login')}
            >
              TRY IT NOW
            </Button>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              className={classes.button}
              onClick={() => history.push('/about')}
            >
              ABOUT US
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} lg={6} justifyContent='center'>
          <img src={home} alt='' className={classes.image} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeScreen;
