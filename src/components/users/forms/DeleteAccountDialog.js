import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Loader from '../../global/Loader';

import { useHistory } from 'react-router-dom';
import axios from 'axios';

const DeleteAccountDialog = ({ open, setOpen, token }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const url =
        process.env.NODE_ENV === 'production'
          ? `${process.env.REACT_APP_SERVER_URL}/api/deleteAccount`
          : '/api/deleteAccount';
      await axios.delete(url, {
        headers: {
          jwt: token,
        },
      });
      sessionStorage.clear();
      setLoading(false);
      history.push('/');
    } catch (error) {
      history.push('/error');
    }
  };

  if (loading) return <Loader />;

  return (
    <Dialog
      open={open.delete}
      onClose={() => {
        setOpen({
          ...open,
          delete: false,
        });
      }}
    >
      <form noValidate autoComplete='off' onSubmit={handleDelete}>
        <DialogTitle color='secondary'>Delete account </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.text}>
            Are you sure? This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setOpen({
                ...open,
                delete: false,
              })
            }
            color='secondary'
          >
            CANCEL
          </Button>

          <Button onClick={handleDelete} color='secondary'>
            CONFIRM
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  text: {
    paddingRight: `${theme.spacing(4)}px`,
  },
}));

export default DeleteAccountDialog;
