import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../global/Loader';
import InfoRow from '../../tasks/screens/global/InfoRow';
import ChangePasswordDialog from '../forms/ChangePasswordDialog';
import DeleteAccountDialog from '../forms/DeleteAccountDialog';
import EditAccountDialog from '../forms/EditAccountDialog';

const ProfileScreen = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();
  auth.authOnly();

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [token, setToken] = useState(auth.getToken());
  const [open, setOpen] = useState({
    edit: false,
    change: false,
    delete: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          process.env.NODE_ENV === 'production'
            ? `${process.env.REACT_APP_SERVER_URL}/api/account`
            : '/api/account';
        const { data } = await axios.get(url, {
          headers: {
            jwt: token,
          },
        });
        setAccount(data);
        setLoading(false);
      } catch (error) {
        history.push('/error');
      }
    };
    fetchData();
    // Re-render if account informations are changed, issuing a new token
  }, [token, history]);

  if (loading) return <Loader />;

  return (
    <>
      <Grid container direction='column' alignItems='center'>
        <Typography variant='h4' className={classes.name} color='secondary'>
          YOUR PROFILE
        </Typography>
        <InfoRow label='Username' info={account.username} />
        <InfoRow label='Email' info={account.email} />
        <Grid container direction='column' item xs={12} alignItems='center'>
          <Button
            variant='contained'
            color='secondary'
            className={classes.edit}
            onClick={() => setOpen({ ...open, edit: true })}
          >
            EDIT ACCOUNT
          </Button>

          <Button
            className={classes.delete}
            variant='contained'
            onClick={() => setOpen({ ...open, delete: true })}
          >
            DELETE ACCOUNT
          </Button>
          <Button
            variant='contained'
            className={classes.change}
            onClick={() => setOpen({ ...open, change: true })}
          >
            CHANGE PASSWORD
          </Button>
        </Grid>
      </Grid>
      <EditAccountDialog
        open={open}
        setOpen={setOpen}
        email={account.email}
        username={account.username}
        token={token}
        setToken={setToken}
      />
      <ChangePasswordDialog open={open} setOpen={setOpen} token={token} />
      <DeleteAccountDialog open={open} setOpen={setOpen} token={token} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  name: {
    paddingTop: '1em',
    paddingBottom: '1em',
  },
  edit: {
    marginTop: theme.spacing(4),
  },
  delete: {
    backgroundColor: theme.palette.error.main,
    color: '#fafafa',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
    marginTop: theme.spacing(4),
  },
  change: {
    backgroundColor: theme.palette.warning.main,
    color: '#fafafa',
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
    marginTop: theme.spacing(4),
  },
}));

export default ProfileScreen;
