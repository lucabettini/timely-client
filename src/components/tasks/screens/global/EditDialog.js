import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import * as yup from 'yup';

import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import useAuth from '../../../../hooks/useAuth';
import useValidation from '../../../../hooks/useValidation';

import CustomInput from '../../../global/CustomInput';
import { useDispatch } from 'react-redux';
import { fetchAreas } from '../../../../redux/tasksSlice';

const EditDialog = ({ open, setOpen, ...props }) => {
  const auth = useAuth();
  const token = auth.getToken();

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();

  const [destroy, setDestroy] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);

  const editForm = useValidation({
    newName: params[props.name],
  });
  const editSchema = {
    newName: yup.string().trim().lowercase().max(20).required(),
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setDisableButtons(true);

    const canSubmit = await editForm.onSubmit(editSchema);
    if (!canSubmit) return;

    try {
      const data = {
        new_name: editForm.values.newName,
      };
      data.old_name = params[props.name];
      if (params.bucket) data.area = params.area;

      await axios.patch(`/api/${props.name}`, data, {
        headers: { jwt: token },
      });
      setOpen(false);
      if (params.bucket) {
        history.push(
          `/bucket/${params.area}/${encodeURIComponent(
            editForm.values.newName
          )}`
        );
      } else {
        dispatch(fetchAreas(token));
        history.push(`/area/${encodeURIComponent(editForm.values.newName)}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    setDisableButtons(true);
    try {
      await axios.delete(
        `/api/${props.name}/?area=${params.area}&bucket=${params.bucket}`,
        {
          headers: { jwt: token },
        }
      );
      history.push(`/area/${params.area}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      {(!destroy || !props.delete) && (
        <form noValidate autoComplete='off' onSubmit={handleEdit}>
          <DialogTitle color='secondary'>Edit {props.name} </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.text}>
              {props.delete ? (
                <>
                  Enter a new name for this {props.name} or click{' '}
                  <ButtonBase
                    component='a'
                    className={classes.here}
                    onClick={() => setDestroy(true)}
                  >
                    here
                  </ButtonBase>{' '}
                  to delete it
                </>
              ) : (
                <>Enter a new name for this {props.name}</>
              )}
            </DialogContentText>
            <CustomInput
              style={{ width: '100%' }}
              name='newName'
              aria-label='new name'
              handleChange={editForm.onChange}
              handleBlur={editForm.onBlur}
              isValid={editForm.isValid('newName')}
              value={editForm.values.newName}
              schema={editSchema.newName}
            />
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button
              onClick={() => setOpen(false)}
              color='secondary'
              disabled={disableButtons}
            >
              CANCEL
            </Button>
            <Button
              onClick={handleEdit}
              color='secondary'
              disabled={disableButtons}
            >
              CHANGE
            </Button>
          </DialogActions>
        </form>
      )}
      {destroy && props.delete && (
        <form noValidate autoComplete='off' onSubmit={handleDelete}>
          <DialogTitle color='secondary'>Delete {props.name} </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.text}>
              Are you sure? This will delete all tasks inside
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button
              onClick={() => setDestroy(false)}
              color='secondary'
              disabled={disableButtons}
            >
              CANCEL
            </Button>
            {props.delete && (
              <Button
                onClick={handleDelete}
                color='secondary'
                disabled={disableButtons}
              >
                CONFIRM
              </Button>
            )}
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  text: {
    paddingRight: `${theme.spacing(4)}px`,
  },
  here: {
    marginBottom: '3px',
    color: theme.palette.secondary.main,
  },
}));

export default EditDialog;
