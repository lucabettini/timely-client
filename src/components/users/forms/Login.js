import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import useAuth from '../../../hooks/useAuth';
import useValidation from '../../../hooks/useValidation';
import CustomInput from '../../global/CustomInput';
import FormError from '../../global/FormError';
import Loader from '../../global/Loader';

const Login = () => {
  const classes = useStyles();

  const history = useHistory();
  const auth = useAuth();
  auth.guestOnly();

  const [status, setStatus] = useState(null);

  const form = useValidation({
    email: '',
    password: '',
  });

  // Validation schema
  const schema = {
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/)
      .required(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set as touched and run validation on all inputs
    const canSubmit = await form.onSubmit(schema);

    if (canSubmit) {
      try {
        setStatus('loading');
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/login`,
          {
            email: form.values.email,
            password: form.values.password,
          }
        );
        auth.login(res.headers.jwt);
        history.push('/home');
      } catch (error) {
        setStatus('error');
      }
    }
  };

  // INPUT PROPS
  const inputProps = (name) => {
    return {
      name,
      label: name.charAt(0).toUpperCase() + name.substring(1),
      handleChange: form.onChange,
      handleBlur: form.onBlur,
      isValid: form.isValid(name),
      value: form.values[name],
    };
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
                {status === 'error' && (
                  <Grid item xs={12}>
                    <FormError>
                      Login failed, bad username or password.
                    </FormError>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <CustomInput
                    schema={schema.email}
                    style={{ width: '100%' }}
                    {...inputProps('email')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    schema={schema.password}
                    type='password'
                    style={{ width: '100%' }}
                    {...inputProps('password')}
                  />
                </Grid>
                <Grid container item xs={12} justifyContent='center'>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                  >
                    LOGIN
                  </Button>
                </Grid>
              </Grid>
              <Grid container item xs={12} justifyContent='center'>
                <a href='/register' className={classes.sign_up}>
                  Create account
                </a>
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
  sign_up: {
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    paddingTop: '25px',
    fontWeight: '500',
  },
}));

export default Login;
