import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from './thunks';

const userAdapter = createEntityAdapter<User>({});

const usersSlice = createSlice({
  name :'users',
  initialState: userAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllUsers.fulfilled, userAdapter.setAll);
    builder.addCase(getAllUsers.rejected, (state, action) => {
      console.log('Error', action.error)
    })
  }
})

export const usersReducer = usersSlice.reducer;