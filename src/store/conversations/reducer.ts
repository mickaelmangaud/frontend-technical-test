import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addNew, getAllConversations } from './thunks';

const conversationAdapter = createEntityAdapter<Conversation>({
  sortComparer: (a, b) => a.lastMessageTimestamp - b.lastMessageTimestamp,
});

const conversationsSlice = createSlice({
  name :'conversations',
  initialState: conversationAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllConversations.fulfilled, conversationAdapter.setAll);
    builder.addCase(getAllConversations.rejected, (state, action) => {
      // TODO: handle error
      console.log('Error in getAllConversation()', action.error)
    });

    builder.addCase(addNew.fulfilled, conversationAdapter.addOne);
  }
})

export const conversationsReducer = conversationsSlice.reducer;