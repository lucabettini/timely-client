import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: false,
};

// SLICE

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    throwError(state) {
      state.error = true;
    },
    clearError(state) {
      state.error = false;
    },
  },
});

export const { throwError, clearError } = errorsSlice.actions;

export default errorsSlice.reducer;

// SELECTORS
export const selectError = (state) => state.error;
