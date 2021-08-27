import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';

function App() {
  return (
    <Router>
      <CssBaseline />
      {/* <Container maxWidth='sm'> */}
      <Switch>
        <Route exact path='/'>
          <div>Slash</div>
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
      </Switch>
      {/* </Container> */}
    </Router>
  );
}

export default App;
