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
import useAuth from '../../../hooks/useAuth';

const EditAccountDialog = ({
  open,
  setOpen,
  email,
  username,
  setToken,
  token,
}) => {
  const classes = useStyles();
  const auth = useAuth();

  const form = useValidation({
    password: '',
    username,
    email,
  });

  const schema = {
    username: yup.string().trim().max(40).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/)
      .required(),
  };

  const [loading, setLoading] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();

    const canSubmit = await form.onSubmit(schema);

    if (canSubmit) {
      setLoading(true);
      const url =
        process.env.NODE_ENV === 'production'
          ? `${process.env.REACT_APP_SERVER_URL}/api/editAccount`
          : '/api/editAccount';
      const data = {
        name: form.values.username,
        email: form.values.email,
        password: form.values.password,
      };
      console.log(`Token: ${token}`);
      const res = await axios.patch(url, data, {
        headers: {
          jwt: token,
        },
      });

      auth.login(res.headers.jwt);
      setToken(res.headers.jwt);
      setOpen({ ...open, edit: false });
      setLoading(false);
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

  if (loading) return <Loader />;

  return (
    <Dialog
      open={open.edit}
      onClose={() => {
        setOpen({
          ...open,
          edit: false,
        });
      }}
    >
      <form
        noValidate
        autoComplete='off'
        onSubmit={handleEdit}
        className={classes.dialog}
      >
        <DialogTitle color='secondary'>Edit account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your current password to confirm your identity
          </DialogContentText>
          <Grid item xs={12} className={classes.field}>
            <CustomInput
              schema={schema.password}
              style={{ width: '100%' }}
              type='password'
              {...inputProps('password')}
            />
          </Grid>
          <Grid item xs={12} className={classes.field}>
            <CustomInput
              schema={schema.username}
              style={{ width: '100%' }}
              {...inputProps('username')}
            />
          </Grid>
          <Grid item xs={12} className={classes.field}>
            <CustomInput
              schema={schema.email}
              style={{ width: '100%' }}
              {...inputProps('email')}
            />
          </Grid>
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button
            onClick={() => setOpen({ ...open, edit: false })}
            color='secondary'
          >
            CANCEL
          </Button>
          <Button onClick={handleEdit} color='secondary'>
            CHANGE
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(3),
  },
}));

export default EditAccountDialog;
