import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newTaskName: '',
};

// SLICE

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setNewTaskName(state, action) {
      state.newTaskName = action.payload;
    },
  },
});

export const { setNewTaskName } = tasksSlice.actions;

export default tasksSlice.reducer;

// SELECTORS
export const selectNewTaskName = (state) => state.tasks.newTaskName;
