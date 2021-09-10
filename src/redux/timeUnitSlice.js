import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stop: false,
  count: 0,
  timerId: null,
};

// SLICE
const timeUnitSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setStop(state, action) {
      state.stop = action.payload;
    },
    setCount(state, action) {
      state.count = action.payload;
    },
    incrementCount(state) {
      state.count = state.count + 1;
    },
    setTimerId(state, action) {
      state.timerId = action.payload;
    },
  },
});

export const { setStop, setCount, incrementCount, setTimerId } =
  timeUnitSlice.actions;

export default timeUnitSlice.reducer;

// SELECTORS
export const selectStop = (state) => state.timeUnit.stop;
export const selectCount = (state) => state.timeUnit.count;
export const selectTimerId = (state) => state.timeUnit.timerId;
