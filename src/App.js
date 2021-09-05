import { CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import store from './redux/store';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomeScreen from './components/HomeScreen';
import BaseScreen from './components/navigation/BaseScreen';

const theme = createTheme({
  palette: {
    primary: { main: '#68ba9f' },
    secondary: { main: '#0b486c' },
    error: { main: '#e7c68e' },
    warning: { main: '#d6444d' },
    info: { main: '#28b5f4' },
    // background: { default: '#d3e1c2' },
  },
});

function App() {
  return (
    <Provider store={store}>
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
              <BaseScreen>
                <HomeScreen />
              </BaseScreen>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
