import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import useAuth from '../../../hooks/useAuth';
import useValidation from '../../../hooks/useValidation';
import CustomInput from '../../global/CustomInput';
import Loader from '../../global/Loader';
import { Alert } from '@material-ui/lab';

const ResetPassword = () => {
  const classes = useStyles();
  const history = useHistory();

  const auth = useAuth();
  auth.guestOnly();

  const [status, setStatus] = useState(null);

  const form = useValidation({
    password: '',
    password_confirmation: '',
  });

  // Validation schema
  const schema = {
    password: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/)
      .required(),
    password_confirmation: yup
      .string()
      .oneOf([form.values.password])
      .required(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set as touched and run validation on all inputs
    const canSubmit = await form.onSubmit(schema);

    if (canSubmit) {
      try {
        setStatus('loading');
        const queryString = new URLSearchParams(window.location.search);
        const url =
          process.env.NODE_ENV === 'production'
            ? `${process.env.REACT_APP_SERVER_URL}/api/resetPassword`
            : '/api/resetPassword';
        await axios.post(url, {
          token: queryString.get('token'),
          email: queryString.get('email'),
          password: form.values.password,
          password_confirmation: form.values.password_confirmation,
        });
        setStatus('success');
        setTimeout(() => {
          history.push('/login');
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // INPUT PROPS
  const inputProps = (name) => {
    return {
      name,
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
        <Grid item xs={10} sm={6} lg={3}>
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
                      Password was changed successfully, redirecting to login...
                    </Alert>
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <CustomInput
                        schema={schema.password}
                        type='password'
                        style={{ width: '100%' }}
                        helperText='Must have at least 8 characters, including numbers, upper and lowercase letters'
                        label='New password'
                        {...inputProps('password')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomInput
                        schema={schema.password_confirmation}
                        type='password'
                        style={{ width: '100%' }}
                        {...inputProps('password_confirmation')}
                        label={'Confirm password'}
                      />
                    </Grid>
                    <Grid container item xs={12} justifyContent='center'>
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                      >
                        REGISTER
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
  forgot_password: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    marginRight: '0px',
    paddingTop: '5px',
    alignSelf: 'end',
    fontWeight: '500',
  },
  sign_in: {
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    paddingTop: '25px',
    fontWeight: '500',
  },
}));

export default ResetPassword;
