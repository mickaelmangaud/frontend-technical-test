import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getAllMessages } from './thunks';

const messageAdapter = createEntityAdapter<Message>({
  sortComparer: (a, b) => a.timestamp - b.timestamp,
});

const messagesSlice = createSlice({
  name :'messages',
  initialState: messageAdapter.getInitialState(),
  reducers: {
    messagesAdded: messageAdapter.addOne
  },
  extraReducers: builder => {
    builder.addCase(getAllMessages.fulfilled, messageAdapter.setAll);
    builder.addCase(getAllMessages.rejected, (state, action) => {
      // TODO: handle error
      console.log('Error in getAllMessages():', action.error);
    });
  }
})

export const messagesReducer = messagesSlice.reducer;