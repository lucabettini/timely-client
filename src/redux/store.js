import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import timeUnitsReducer from './timeUnitsSlice';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    timeUnits: timeUnitsReducer,
  },
});
