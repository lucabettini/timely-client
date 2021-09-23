import React, { useState } from 'react';
import * as yup from 'yup';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Loader from '../../global/Loader';
import useValidation from '../../../hooks/useValidation';
import CustomInput from '../../global/CustomInput';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Alert } from '@material-ui/lab';

const ChangePasswordDialog = ({ open, setOpen, token }) => {
  const classes = useStyles();
  const history = useHistory();

  const form = useValidation({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const schema = {
    old_password: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/)
      .required(),
    password: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/)
      .required(),
    password_confirmation: yup
      .string()
      .oneOf([form.values.password])
      .required(),
  };

  const [status, setStatus] = useState('idle');

  const handleEdit = async (e) => {
    e.preventDefault();

    const canSubmit = await form.onSubmit(schema);

    if (canSubmit) {
      try {
        setStatus('loading');
        const url =
          process.env.NODE_ENV === 'production'
            ? `${process.env.REACT_APP_SERVER_URL}/api/changePassword`
            : '/api/changePassword';
        const data = {
          old_password: form.values.old_password,
          password: form.values.password,
          password_confirmation: form.values.password_confirmation,
        };
        await axios.post(url, data, {
          headers: {
            jwt: token,
          },
        });
        setStatus('success');
      } catch (error) {
        history.push('/error');
      }
    }
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

  if (status === 'loading') return <Loader />;

  return (
    <Dialog
      open={open.change}
      onClose={() => {
        setOpen({
          ...open,
          change: false,
        });
      }}
    >
      <form
        noValidate
        autoComplete='off'
        onSubmit={handleEdit}
        className={classes.dialog}
      >
        <DialogTitle color='secondary'>Change password</DialogTitle>
        {status === 'success' ? (
          <Grid item xs={12}>
            <Alert
              variant='filled'
              severity='success'
              style={{ widht: '100%' }}
              className={classes.alert}
            >
              Password changed!
            </Alert>
          </Grid>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>
                Enter your current password to confirm your identity
              </DialogContentText>
              <Grid item xs={12} className={classes.field}>
                <CustomInput
                  schema={schema.old_password}
                  style={{ width: '100%' }}
                  type='password'
                  {...inputProps('old_password')}
                  label={'Old password'}
                />
              </Grid>
              <Grid item xs={12} className={classes.field}>
                <CustomInput
                  schema={schema.password}
                  style={{ width: '100%' }}
                  type='password'
                  {...inputProps('password')}
                  label={'New password'}
                />
              </Grid>
              <Grid item xs={12} className={classes.field}>
                <CustomInput
                  schema={schema.password_confirmation}
                  type='password'
                  style={{ width: '100%' }}
                  {...inputProps('password_confirmation')}
                  label={'Confirm new password'}
                />
              </Grid>
            </DialogContent>
            <DialogActions className={classes.buttons}>
              <Button
                onClick={() =>
                  setOpen({
                    ...open,
                    change: false,
                  })
                }
                color='secondary'
              >
                CANCEL
              </Button>
              <Button onClick={handleEdit} color='secondary'>
                CHANGE
              </Button>
            </DialogActions>
          </>
        )}
      </form>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(3),
  },
  alert: {
    margin: theme.spacing(2),
  },
}));

export default ChangePasswordDialog;
