import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import { timelyApi } from './timely';
import timeUnitReducer from './timeUnitSlice';

export const timelyErrorHandler = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    document.location.href = '/error';
  }
  return next(action);
};

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    timeUnit: timeUnitReducer,
    [timelyApi.reducerPath]: timelyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([timelyApi.middleware, timelyErrorHandler]),
});
