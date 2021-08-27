import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import * as yup from 'yup';
import useForm from '../../hooks/useForm';
import CustomInput from '../CustomInput';

const Login = () => {
  const form = useForm({
    email: '',
    password: '',
  });

  const schema = {
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/)
      .required(),
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.onSubmit(schema);

    if (form.canSubmit()) {
      console.log('Loading...');
      try {
        const res = await axios.post('/api/login', {
          email: form.values.email,
          password: form.values.password,
        });
        console.log(res.headers.jwt);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{
        minHeight: '100vh',
        backgroundColor: 'cyan',
        paddingBottom: '20%',
      }}
    >
      <Grid item xs={6} style={{ border: '1px solid blue' }}>
        <form
          noValidate
          autoComplete='off'
          style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}
          onSubmit={handleSubmit}
        >
          <CustomInput schema={schema.email} {...inputProps('email')} />
          <CustomInput
            schema={schema.password}
            type='password'
            {...inputProps('password')}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: '10px' }}
          >
            INVIA
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
