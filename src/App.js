import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Route exact='/login'>
          <Login />
        </Route>
      </Router>
    </React.Fragment>
  );
}

export default App;
