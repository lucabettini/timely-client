import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  areas: [],
  newTaskName: '',
};

// SLICE

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setAreas(state, action) {
      state.areas = action.payload;
    },
    setNewTaskName(state, action) {
      state.newTaskName = action.payload;
    },
  },
});

export const { setAreas, setNewTaskName } = tasksSlice.actions;

export default tasksSlice.reducer;

// SELECTORS
export const selectAreas = (state) => state.tasks.areas;
export const selectNewTaskName = (state) => state.tasks.newTaskName;
