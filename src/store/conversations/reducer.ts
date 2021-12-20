import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addNew, getAllConversations, deleteOne } from './thunks';

const conversationAdapter = createEntityAdapter<Conversation>({
  sortComparer: (a, b) => a.lastMessageTimestamp - b.lastMessageTimestamp,
});

const conversationsSlice = createSlice({
  name :'conversations',
  initialState: conversationAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    /* get */
    builder.addCase(getAllConversations.fulfilled, conversationAdapter.setAll);
    builder.addCase(getAllConversations.rejected, (state, action) => {
      console.log('Error in getAllConversation()', action.error)
    });

    /* post */
    builder.addCase(addNew.fulfilled, conversationAdapter.addOne);
    builder.addCase(addNew.rejected, (state, action) => {
      console.log('Error in addNewConversation()', action.error)
    });

    /* delete */
    builder.addCase(deleteOne.fulfilled, conversationAdapter.removeOne);
    builder.addCase(deleteOne.rejected, (state, action) => {
      console.log('Error in deleteOneConversation()', action.error)
    });
  }
})

export const conversationsReducer = conversationsSlice.reducer;