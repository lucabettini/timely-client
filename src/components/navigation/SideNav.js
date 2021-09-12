import React from 'react';
import { useHistory } from 'react-router';

import {
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import BallotIcon from '@material-ui/icons/Ballot';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import { makeStyles } from '@material-ui/styles';

import Loader from '../global/Loader';
import {
  useGetAreasQuery,
  useGetOverdueTasksQuery,
} from '../../redux/endpoints/getTasks';

const SideNav = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const { data: areas, isSuccess } = useGetAreasQuery();
  const { data: overdue, isSuccess: overdueAreLoaded } =
    useGetOverdueTasksQuery();

  if (!isSuccess) return <Loader />;

  return (
    <div>
      <div className={props.classes} />
      <Divider />
      <List>
        <ListItem button component='a' onClick={() => history.push('/overdue')}>
          {overdueAreLoaded ? (
            <Badge
              badgeContent={overdue.length}
              max={99}
              color='error'
              className={classes.icons}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <WarningRoundedIcon />
            </Badge>
          ) : (
            <WarningRoundedIcon className={classes.icons} />
          )}

          <ListItemText primary='Overdue' className={classes.text} />
        </ListItem>
        <ListItem
          button
          component='a'
          onClick={() => history.push('/tracking')}
        >
          <BallotIcon className={classes.icons} />
          <ListItemText primary='Tracking' className={classes.text} />
        </ListItem>

        <Divider />
        <ListItem button component='a' onClick={() => history.push('/home')}>
          <HomeRoundedIcon className={classes.icons} />
          <ListItemText primary='This week' className={classes.text} />
        </ListItem>
        <Divider />
        {areas.map((area) => {
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
