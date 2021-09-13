import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Drawer, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SideNav from './SideNav';
import Navbar from './Navbar';
import TimeUnitBar from './TimeUnitBar';
import { useGetActiveTimeUnitQuery } from '../../redux/endpoints/timeUnit';

function BaseScreen(props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data, isError } = useGetActiveTimeUnitQuery();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (isError) return <Redirect push to='/error' />;

  return (
    <div className={classes.root}>
      <Navbar handleDrawerToggle={handleDrawerToggle} drawerWidth={240} />
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden lgUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor='left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            elevation={3}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <SideNav classes={classes.toolbar} />
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
            elevation={3}
          >
            <SideNav classes={classes.toolbar} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
      {data?.id && (
        <nav>
          <TimeUnitBar />
        </nav>
      )}
    </div>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // Necessary for content to be on the left of
    // sidenav when open
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // Necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.light,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default BaseScreen;
