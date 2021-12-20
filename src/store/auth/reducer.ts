import { createSlice } from '@reduxjs/toolkit';
import { login } from './thunks';



const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => ({
      user: action.payload,
      isAuthenticated: true,
      error: null
    }))
  },
});

export const authReducer = authSlice.reducer;
