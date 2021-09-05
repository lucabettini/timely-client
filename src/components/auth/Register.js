import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import CustomInput from '../CustomInput';
import Loader from '../Loader';

const Register = () => {
  const classes = useStyles();

  const history = useHistory();
  const auth = useAuth();
  auth.guestOnly();

  const [status, setStatus] = useState(null);

  const form = useForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Validation schema
  const schema = {
    username: yup.string().required(),
    email: yup.string().email().required(),
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
        const res = await axios.post('/api/register', {
          name: form.values.username,
          email: form.values.email,
          password: form.values.password,
          password_confirmation: form.values.password_confirmation,
        });
        auth.login(res.headers.jwt);
        history.push('/home');
      } catch (error) {
        // TO DO: integrate with global error handling
        history.push('/error');
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
        <Grid item xs={10} sm={6} lg={3}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Paper className={classes.form}>
              <Grid container direction='column' spacing={3}>
                <Grid item xs={12}>
                  <CustomInput
                    schema={schema.username}
                    style={{ width: '100%' }}
                    {...inputProps('username')}
                  />
                </Grid>
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
                <Grid item xs={12} container direction='column'>
                  <CustomInput
                    schema={schema.password_confirmation}
                    type='password'
                    style={{ width: '100%' }}
                    {...inputProps('password_confirmation')}
                    label={'Confirm password'}
                  />
                  {/* TO DO: add forgot password link */}
                  <a href='/' className={classes.forgot_password}>
                    Forgot password?
                  </a>
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
              </Grid>
              <Grid container item xs={12} justifyContent='center'>
                <a href='/login' className={classes.sign_in}>
                  Sign in with your account
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
    backgroundColor: `${theme.palette.success.main}`,
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

export default Register;
