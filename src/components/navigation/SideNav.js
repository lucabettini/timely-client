import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import BallotIcon from '@material-ui/icons/Ballot';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import { makeStyles } from '@material-ui/styles';

import { selectAreas, selectStatus, fetchAreas } from '../../redux/tasksSlice';
import useAuth from '../../hooks/useAuth';
import Loader from '../global/Loader';

const SideNav = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const auth = useAuth();
  const token = auth.getToken();

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchAreas(token));
  }, [dispatch, token]);

  const areas = useSelector(selectAreas);

  if (status !== 'succeeded') return <Loader />;

  return (
    <div>
      <div className={props.classes} />
      <Divider />
      <List>
        <ListItem button component='a'>
          <WarningRoundedIcon className={classes.icons} />
          <ListItemText primary='Overdue' className={classes.text} />
        </ListItem>
        <ListItem button component='a'>
          <BallotIcon className={classes.icons} />
          <ListItemText primary='Open' className={classes.text} />
        </ListItem>

        <Divider />
        <ListItem button component='a' onClick={() => history.push('/home')}>
          <HomeRoundedIcon className={classes.icons} />
          <ListItemText primary='This week' className={classes.text} />
        </ListItem>
        <Divider />
        {Object.keys(areas).map((area) => {
          return (
            <ListItem
              button
              component='a'
              key={area}
              onClick={() => history.push(`/area/${area}`)}
            >
              <CategoryRoundedIcon className={classes.icons} />
              <ListItemText
                primary={normalizeString(area)}
                className={classes.text}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

const normalizeString = (string) => {
  let lowercase = string.toLowerCase();
  return lowercase.charAt(0).toUpperCase() + lowercase.substring(1);
};

const useStyles = makeStyles((theme) => ({
  icons: {
    color: theme.palette.secondary.dark,
    marginLeft: '5px',
    marginRight: '10px',
  },
  text: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default SideNav;
