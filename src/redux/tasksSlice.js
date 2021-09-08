import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  areas: [],
  status: 'idle',
  error: false,
  newTaskName: '',
};

// THUNKS
export const fetchAreas = createAsyncThunk(
  'areas/fetchAreas',
  async (token) => {
    const res = await axios.get('/api/areas', {
      headers: { jwt: token },
    });
    return res.data.data;
  }
);

// SLICE

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setNewTaskName(state, action) {
      state.newTaskName = action.payload;
    },
  },
  extraReducers: {
    [fetchAreas.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAreas.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.areas = action.payload;
    },
    [fetchAreas.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = true;
      state.areas = [];
    },
  },
});

export const { setNewTaskName } = tasksSlice.actions;

export default tasksSlice.reducer;

// SELECTORS
export const selectAreas = (state) => state.tasks.areas;
export const selectStatus = (state) => state.tasks.status;
export const selectNewTaskName = (state) => state.tasks.newTaskName;
