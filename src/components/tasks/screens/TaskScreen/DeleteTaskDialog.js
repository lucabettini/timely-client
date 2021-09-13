import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Loader from '../../../global/Loader';

import { useDeleteTaskMutation } from '../../../../redux/endpoints/editTasks';
import { useHistory, useParams } from 'react-router-dom';

const DeleteTaskDialog = ({ open, setOpen }) => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteTask(params.id);
    history.goBack();
  };

  if (isLoading) return <Loader />;

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <form noValidate autoComplete='off' onSubmit={handleDelete}>
        <DialogTitle color='secondary'>Delete Task </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.text}>
            Are you sure? This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='secondary'>
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

export default DeleteTaskDialog;
