import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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

import useValidation from '../../../../hooks/useValidation';

import CustomInput from '../../../global/CustomInput';
import Loader from '../../../global/Loader';
import {
  useDeleteByBucketMutation,
  useEditAreaNameMutation,
  useEditBucketNameMutation,
} from '../../../../redux/endpoints/editTasks';

const EditDialog = ({ open, setOpen, ...props }) => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();

  const [editBucketName, { isLoading: isBucketLoading }] =
    useEditBucketNameMutation();
  const [editAreaName, { isLoading: isAreaLoading }] =
    useEditAreaNameMutation();
  const [deleteByBucket, { isLoading: isDeleteLoading }] =
    useDeleteByBucketMutation();

  const [destroy, setDestroy] = useState(false);

  const editForm = useValidation({
    newName: params[props.name],
  });
  const editSchema = {
    newName: yup.string().trim().lowercase().max(20).required(),
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const canSubmit = await editForm.onSubmit(editSchema);
    if (!canSubmit) return;

    const data = {
      new_name: editForm.values.newName,
    };
    data.old_name = params[props.name];
    if (params.bucket) {
      data.area = params.area;
      await editBucketName(data);
      setOpen(false);
      history.push(
        `/bucket/${params.area}/${encodeURIComponent(editForm.values.newName)}`
      );
    } else {
      await editAreaName(data);
      setOpen(false);
      history.push(`/area/${encodeURIComponent(editForm.values.newName)}`);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteByBucket({ area: params.area, bucket: params.bucket });
    history.push(`/area/${params.area}`);
  };

  if (isBucketLoading || isAreaLoading || isDeleteLoading) return <Loader />;

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
            <Button onClick={() => setOpen(false)} color='secondary'>
              CANCEL
            </Button>
            <Button onClick={handleEdit} color='secondary'>
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
            <Button onClick={() => setDestroy(false)} color='secondary'>
              CANCEL
            </Button>
            {props.delete && (
              <Button onClick={handleDelete} color='secondary'>
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
