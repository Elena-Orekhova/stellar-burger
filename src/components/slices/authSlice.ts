import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthChecked: false
  },
  reducers: {}
});

export const authReducer = authSlice.reducer;
