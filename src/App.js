import { CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';

const theme = createTheme({
  palette: {
    error: { main: '#FF773D' },
    success: { main: '#DDFFD9' },
    warning: { main: '#FDC31D' },
    primary: { main: '#28b5f4' },
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
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
