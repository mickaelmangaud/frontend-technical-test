import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getAllMessages, addMessage } from './thunks';

const messageAdapter = createEntityAdapter<Message>({
  sortComparer: (a, b) => a.timestamp - b.timestamp,
});

const messagesSlice = createSlice({
  name :'messages',
  initialState: messageAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    /* get */
    builder.addCase(getAllMessages.fulfilled, messageAdapter.setAll);
    builder.addCase(getAllMessages.rejected, (state, action) => {
      // TODO: handle error
      console.log('Error in getAllMessages():', action.error);
    });

    /* post */
    builder.addCase(addMessage.fulfilled, messageAdapter.setOne);
    builder.addCase(addMessage.rejected, (state, action) => {
      console.log('action')
    })
  }
})

export const messagesReducer = messagesSlice.reducer;