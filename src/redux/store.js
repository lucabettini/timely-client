import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import { timelyApi } from './timely';
import timeUnitReducer from './timeUnitSlice';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    timeUnit: timeUnitReducer,
    [timelyApi.reducerPath]: timelyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timelyApi.middleware),
});
