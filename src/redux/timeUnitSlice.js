import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  id: null,
  taskId: null,
  startTime: null,
  endTime: null,
  request: 'idle',
};

// SLICE

const timeUnitSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export default timeUnitSlice.reducer;

// SELECTORS
export const selectTimeUnit = (state, taskId) => {};
export const selectTimeUnitStatus = (state, taskId) => {
  if (state.timeUnits.taskId === taskId) return state.timeUnits.status;
};

export const selectRequestStatus = (state, taskId) => {
  if (state.timeUnits.taskId === taskId) return state.timeUnits.request;
};
