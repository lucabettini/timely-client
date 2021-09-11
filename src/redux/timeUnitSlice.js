import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskId: null,
  count: 0,
  timerId: null,
};

// SLICE
const timeUnitSlice = createSlice({
  name: 'timeUnit',
  initialState,
  reducers: {
    start(state, action) {
      state.taskId = action.payload.id;
      state.count = action.payload.count;
    },
    incrementCount(state) {
      state.count = state.count + 1;
    },
    resetCount(state) {
      state.count = 0;
    },
    setTimerId(state, action) {
      state.timerId = action.payload;
    },
  },
});

export const { start, incrementCount, setTimerId, resetCount } =
  timeUnitSlice.actions;

export default timeUnitSlice.reducer;

// SELECTORS
export const selectCount = (state) => state.timeUnit.count;
export const selectTimerId = (state) => state.timeUnit.timerId;
export const selectTaskId = (state) => state.timeUnit.taskId;
