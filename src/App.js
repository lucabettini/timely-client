import { CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import store from './redux/store';
import Login from './components/users/forms/Login';
import Register from './components/users/forms/Register';
import BaseScreen from './components/navigation/BaseScreen';
import AddTaskForm from './components/tasks/forms/AddTaskForm';
import HomeScreen from './components/tasks/screens/HomeScreen';
import BucketScreen from './components/tasks/screens/BucketScreen';
import AreaScreen from './components/tasks/screens/AreaScreen';
import TaskScreen from './components/tasks/screens/TaskScreen';
import EditTaskForm from './components/tasks/forms/EditTaskForm';
import TrackingScreen from './components/tasks/screens/TrackingScreen';
import OverdueScreen from './components/tasks/screens/OverdueScreen';
import ErrorScreen from './components/global/ErrorScreen';
import TomorrowScreen from './components/tasks/screens/TomorrowScreen';
import WeekScreen from './components/tasks/screens/WeekScreen';

const theme = createTheme({
  palette: {
    primary: { main: '#68ba9f' },
    secondary: { main: '#0b486c' },
    error: { main: '#c83e4d' },
    warning: { main: '#ffa62b' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Switch>
          {/* GUESTS ROUTES */}
          <Route exact path='/'>
            <div>Slash</div>
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/error'>
            <ErrorScreen />
          </Route>
          {/* PROTECTED ROUTES */}
          {/* SCREENS */}
          <Provider store={store}>
            <BaseScreen>
              <Route exact path='/home'>
                <HomeScreen />
              </Route>
              <Route exact path='/tomorrow'>
                <TomorrowScreen />
              </Route>
              <Route exact path='/week'>
                <WeekScreen />
              </Route>
              <Route exact path='/tracking'>
                <TrackingScreen />
              </Route>
              <Route exact path='/overdue'>
                <OverdueScreen />
              </Route>
              <Route exact path='/area/:area'>
                <AreaScreen />
              </Route>
              <Route exact path='/bucket/:area/:bucket'>
                <BucketScreen />
              </Route>
              <Route exact path='/tasks/:id'>
                <TaskScreen />
              </Route>
              {/* FORMS */}
              <Route exact path='/addTask'>
                <AddTaskForm />
              </Route>
              <Route exact path='/tasks/:id/edit'>
                <EditTaskForm />
              </Route>
            </BaseScreen>
          </Provider>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
