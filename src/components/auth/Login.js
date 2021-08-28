import { Button, Grid, Paper, useTheme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import CustomInput from '../CustomInput';
import FormError from '../FormError';
import Loader from '../Loader';

const Login = () => {
  const history = useHistory();
  const auth = useAuth();
  auth.guestOnly();

  const [status, setStatus] = useState(null);

  const form = useForm({
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
        const res = await axios.post('/api/login', {
          email: form.values.email,
          password: form.values.password,
        });
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

  // CSS STYLING
  const theme = useTheme();

  const useStyles = makeStyles({
    container: {
      minHeight: '100vh',
      paddingBottom: '20vh',
      flexGrow: 1,
    },
    form: {
      border: `1px solid ${theme.palette.primary.main}`,
      padding: '5%',
      backgroundColor: `${theme.palette.success.main}`,
    },
    alert: {
      cursor: 'pointer',
      width: '100%',
      color: theme.palette.text.primary,
    },
  });

  const classes = useStyles();

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
                <Grid item container justifyContent='space-between' xs={12}>
                  <Alert
                    variant='filled'
                    severity='info'
                    className={classes.alert}
                    onClick={() => {
                      history.push('/register');
                    }}
                  >
                    Need an account? Sign up
                  </Alert>
                </Grid>
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
            </Paper>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
