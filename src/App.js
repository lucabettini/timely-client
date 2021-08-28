import { CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomeScreen from './components/HomeScreen';

const theme = createTheme({
  palette: {
    error: { main: '#FF773D' },
    success: { main: '#DDFFD9' },
    warning: { main: '#FDC31D' },
    primary: { main: '#28b5f4' },
    info: { main: '#28b5f4' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Switch>
          <Route exact path='/'>
            <div>Slash</div>
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>

          <Route exact path='/home'>
            <HomeScreen />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
