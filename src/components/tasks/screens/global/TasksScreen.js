import { makeStyles } from '@material-ui/styles';
import React from 'react';

import AddTaskInput from './AddTaskInput';
import TaskGrid from './TaskGrid';
import {
  useStartTimeUnitMutation,
  useEditTimeUnitMutation,
} from '../../../../redux/endpoints/timeUnit';

const TasksScreen = ({ tasks, timeUnit }) => {
  const classes = useStyles();

  const [startTimeUnit] = useStartTimeUnitMutation();
  const [editTimeUnit] = useEditTimeUnitMutation();

  const handleTimeUnit = async (taskId) => {
    const now = new Date();
    if (!timeUnit?.task_id) {
      await startTimeUnit({ taskId, startTime: now.toISOString() });
    } else if (timeUnit.task_id === taskId) {
      await editTimeUnit({
        id: timeUnit.id,
        startTime: timeUnit.start_time,
        endTime: now.toISOString(),
      });
    } else {
      // Another task was started while one was being tracked,
      // stop the first before starting the second
      await editTimeUnit({
        id: timeUnit.id,
        startTime: timeUnit.start_time,
        endTime: now.toISOString(),
      });
      await startTimeUnit({ taskId, startTime: now.toISOString() });
    }
  };

  return (
    <>
      <AddTaskInput />
      <div className={classes.container}>
        {[...tasks]
          .sort((a, b) => {
            return a.completed ? 1 : -1;
          })
          .map((task) => {
            return (
              <TaskGrid
                task={task}
                key={task.id}
                timeUnit={timeUnit?.task_id === task.id ? timeUnit : null}
                handleTimeUnit={handleTimeUnit}
              />
            );
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
