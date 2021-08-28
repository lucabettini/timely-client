import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import BallotIcon from '@material-ui/icons/Ballot';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import { useState } from 'react';
import Loader from '../Loader';
import { makeStyles } from '@material-ui/styles';
import { selectAreas, setAreas } from '../../redux/tasksSlice';

const SideNav = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    // Await axios
    const areas = ['Gran progetto', 'Piccolo PROGETTO', 'proggetONE'];
    dispatch(setAreas(areas));
    setLoading(false);
  }, [dispatch]);

  const areas = useSelector(selectAreas);

  if (loading) return <Loader />;

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
        <ListItem button component='a'>
          <HomeRoundedIcon className={classes.icons} />
          <ListItemText primary='Today' className={classes.text} />
        </ListItem>
        <Divider />
        {areas.map((area) => {
          return (
            <ListItem button component='a'>
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
    color: theme.palette.primary.dark,
    marginLeft: '5px',
    marginRight: '10px',
  },
  text: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default SideNav;
