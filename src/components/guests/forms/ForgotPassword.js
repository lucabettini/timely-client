import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import { Alert } from '@material-ui/lab';

const ForgotPassword = () => {
  const classes = useStyles();

  const history = useHistory();
  const auth = useAuth();
  auth.guestOnly();

  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(true);
  const schema = yup.string().email().required();

  const handleChange = async (e) => {
    setEmail(e.target.value);
    const isValid = await schema.isValid(e.target.value);
    setValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valid) {
      try {
        setStatus('loading');
        const url =
          process.env.NODE_ENV === 'production'
            ? `${process.env.REACT_APP_SERVER_URL}/api/forgotPassword`
            : '/api/forgotPassword';
        await axios.post(url, {
          email: email,
        });
        setStatus('success');
      } catch (error) {
        history.push('/error');
      }
    }
  };

  return (
    <>
      {status === 'loading' && <Loader />}
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        className={classes.container}
      >
        <Grid item xs={10} sm={6} lg={3} className={classes.item}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Paper className={classes.form}>
              <Grid container direction='column' spacing={3}>
                {status === 'success' ? (
                  <Grid item xs={12}>
                    <Alert
                      variant='filled'
                      severity='success'
                      style={{ widht: '100%' }}
                    >
                      An email was sent to {email} with a link to create a new
                      password.
                    </Alert>
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        onChange={handleChange}
                        error={valid ? null : true}
                        value={email}
                        label={'Email'}
                        style={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid container item xs={12} justifyContent='center'>
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                        disabled={!valid}
                      >
                        SEND EMAIL
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    paddingBottom: '20vh',
    flexGrow: 1,
  },
  form: {
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '5%',
  },
}));

export default ForgotPassword;
