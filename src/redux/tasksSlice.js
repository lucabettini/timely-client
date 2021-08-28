import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  areas: [],
};

// SLICE

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setAreas(state, action) {
      state.areas = action.payload;
    },
  },
});

export const { setAreas } = tasksSlice.actions;

export default tasksSlice.reducer;

// SELECTORS
export const selectAreas = (state) => state.tasks.areas;
