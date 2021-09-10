import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  id: null,
  taskId: null,
  startTime: null,
  endTime: null,
  request: 'idle',
};

// THUNKS
export const startTimeUnit = createAsyncThunk(
  'timeUnits/startTimeUnit',
  async ({ token, taskId }) => {
    const now = new Date();
    const res = await axios.post(
      `/api/tasks/${taskId}/time_unit`,
      {
        start_time: now.toISOString(),
      },
      {
        headers: { jwt: token },
      }
    );
    return res.data.data || null;
  }
);

export const stopTimeUnit = createAsyncThunk(
  'timeUnits/stopTimeUnit',
  async ({ token, id, startTime }) => {
    const now = new Date();
    const res = await axios.put(
      `/api/time_unit/${id}`,
      {
        start_time: startTime,
        end_time: now.toISOString(),
      },
      {
        headers: { jwt: token },
      }
    );
    return res.data.data;
  }
);

export const fetchTimeUnit = createAsyncThunk(
  'timeUnits/fetchTimeUnit',
  async (token) => {
    const res = await axios.get(`/api/time_unit`, {
      headers: { jwt: token },
    });
    return res.data.data;
  }
);

// SLICE

const timeUnitsSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTimeUnit.pending]: (state, action) => {
      state.request = 'loading';
      state.status = 'idle';
      state.id = null;
      state.taskId = null;
      state.startTime = null;
      state.endTime = null;
    },
    [fetchTimeUnit.fulfilled]: (state, action) => {
      state.request = 'succeeded';
      if (action.payload?.id) {
        state.status = 'on';
        state.id = action.payload.id;
        state.taskId = action.payload.task_id;
        state.startTime = action.payload.start_time;
      }
    },
    [fetchTimeUnit.rejected]: (state) => {
      state.request = 'failed';
    },
    [startTimeUnit.pending]: (state) => {
      state.request = 'loading';
    },
    [startTimeUnit.fulfilled]: (state, action) => {
      state.request = 'succeeded';
      state.status = 'on';
      state.id = action.payload.id;
      state.taskId = action.payload.task_id;
      state.startTime = action.payload.start_time;
    },
    [startTimeUnit.rejected]: (state) => {
      state.request = 'failed';
    },
    [stopTimeUnit.pending]: (state) => {
      state.request = 'loading';
    },
    [stopTimeUnit.fulfilled]: (state, action) => {
      state.request = 'succeeded';
      state.status = 'off';
      state.id = action.payload.id;
      state.taskId = action.payload.task_id;
      state.endTime = action.payload.end_time;
    },
    [stopTimeUnit.rejected]: (state) => {
      state.request = 'failed';
    },
  },
});

export default timeUnitsSlice.reducer;

// SELECTORS
export const selectTimeUnit = (state, taskId) => {
  if (state.timeUnits.taskId === taskId) {
    return {
      id: state.timeUnits.id,
      taskId: state.timeUnits.taskId,
      startTime: state.timeUnits.startTime,
      endTime: state.timeUnits.endTime,
    };
  }
  return null;
};
export const selectTimeUnitStatus = (state, taskId) => {
  if (state.timeUnits.taskId === taskId) return state.timeUnits.status;
};

export const selectRequestStatus = (state, taskId) => {
  if (state.timeUnits.taskId === taskId) return state.timeUnits.request;
};
