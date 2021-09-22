import { makeStyles } from '@material-ui/styles';
import React from 'react';

import AddTaskInput from './AddTaskInput';
import TaskRow from './TaskRow';

const TasksScreen = ({ tasks }) => {
  const classes = useStyles();

  return (
    <>
      <AddTaskInput />
      <div className={classes.container}>
        {[...tasks]
          .sort((a, b) => {
            return a.completed ? 1 : -1;
          })
          .map((task) => {
            return <TaskRow task={task} key={task.id} />;
          })}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
}));

export default TasksScreen;
