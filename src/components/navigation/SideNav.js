import React from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';

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
import TodayRoundedIcon from '@material-ui/icons/TodayRounded';
import NextWeekRoundedIcon from '@material-ui/icons/NextWeekRounded';
import { makeStyles } from '@material-ui/styles';

import Loader from '../global/Loader';
import {
  useGetAreasQuery,
  useGetOverdueTasksQuery,
} from '../../redux/endpoints/getTasks';

const SideNav = (props) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const { data: areas, isSuccess, isError } = useGetAreasQuery();
  const {
    data: overdue,
    isSuccess: overdueAreLoaded,
    isError: isOverdueError,
  } = useGetOverdueTasksQuery();

  if (isError || isOverdueError) return <Redirect push to='/error' />;

  if (!isSuccess) return <Loader />;

  return (
    <div>
      <div className={props.classes} />
      <Divider />
      <List>
        <ListItem
          button
          component='a'
          selected={location.pathname === '/overdue'}
          onClick={() => history.push('/overdue')}
        >
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
          selected={location.pathname === '/tracking'}
          onClick={() => history.push('/tracking')}
        >
          <BallotIcon className={classes.icons} />
          <ListItemText primary='Tracking' className={classes.text} />
        </ListItem>

        <Divider />
        <ListItem
          button
          component='a'
          selected={location.pathname === '/home'}
          onClick={() => history.push('/home')}
        >
          <HomeRoundedIcon className={classes.icons} />
          <ListItemText primary='Today' className={classes.text} />
        </ListItem>
        <ListItem
          button
          component='a'
          selected={location.pathname === '/tomorrow'}
          onClick={() => history.push('/tomorrow')}
        >
          <TodayRoundedIcon className={classes.icons} />
          <ListItemText primary='Tomorrow' className={classes.text} />
        </ListItem>
        <ListItem
          button
          component='a'
          selected={location.pathname === '/week'}
          onClick={() => history.push('/week')}
        >
          <NextWeekRoundedIcon className={classes.icons} />
          <ListItemText primary='This week' className={classes.text} />
        </ListItem>
        <Divider />
        {areas.map((area) => {
          const pattern = new RegExp(`^/area/${area}|/bucket/${area}`);

          return (
            <ListItem
              button
              component='a'
              key={area}
              selected={pattern.test(location.pathname)}
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
