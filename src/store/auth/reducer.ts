import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './thunks';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: state => ({ ...state, error: null }),
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (_, action) => ({
      user: action.payload,
      isAuthenticated: true,
      error: null,
    }));

    builder.addCase(login.rejected, (_, action) => ({
      user: null,
      isAuthenticated: false,
      error: action.error.message,
    }));

    builder.addCase(logout.fulfilled, () => ({
      user: null,
      isAuthenticated: false,
      error: null,
    }));
  },
});

export const authReducer = authSlice.reducer;

export const { resetError } = authSlice.actions;
