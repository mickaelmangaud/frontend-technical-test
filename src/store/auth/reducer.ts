import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 1,
    nickname: 'Thibaut',
    token: 'xxxx',
  },
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const authReducer = authSlice.reducer;
