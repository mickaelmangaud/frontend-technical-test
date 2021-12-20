import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  areUsersDisplayed: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleUsersDisplayed: (state, action) => ({ ...state, areUsersDisplayed: !state.areUsersDisplayed })
  },
});

export const appReducer = appSlice.reducer;

export const { toggleUsersDisplayed } = appSlice.actions;
