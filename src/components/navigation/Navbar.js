import React, { useState } from 'react';

import {
  AppBar,
  createTheme,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  ThemeProvider,
  Grid,
  MenuItem,
  Menu,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '@fontsource/luckiest-guy';
import { AccountCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';

const theme = createTheme({
  typography: {
    fontFamily: '"Luckiest Guy", serif',
  },
});

const StyledMenu = withStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.main,
  },
}))((props) => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const Navbar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onLogout = () => {
    auth.logout();
    history.push('/');
  };

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Grid container justifyContent='space-between' alignItems='flex-end'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <ThemeProvider theme={theme}>
            <Typography
              variant='h6'
              noWrap
              className={classes.title}
              fontWeight={700}
            >
              TIMELY
            </Typography>
          </ThemeProvider>
          <div>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={(e) => setAnchorEl(e.currentTarget)}
              className={classes.externalMenuIcon}
            >
              <AccountCircle />
            </IconButton>
            <StyledMenu
              id='menu-appbar'
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={onLogout} className={classes.menuItem}>
                <ExitToAppIcon className={classes.internalMenuIcon} />
                <Typography>Logout</Typography>
              </MenuItem>
            </StyledMenu>
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - 240px)`,
      marginLeft: 240,
    },
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    color: theme.palette.secondary.dark,
  },
  title: {
    color: theme.palette.secondary.dark,
    fontSize: '1.8em',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItem: {
    backgroundColor: theme.palette.primary.light,
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  menu: {
    backgroundColor: theme.palette.primary.light,
  },
  internalMenuIcon: {
    marginRight: '5px',
    color: theme.palette.secondary.dark,
  },
  externalMenuIcon: {
    color: theme.palette.secondary.dark,
  },
}));

export default Navbar;
