import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../utils';

export const getAllMessages = createAsyncThunk(
  'messages/getAll',
  async (conversationId: number, thunkAPI) =>
    (await axios.get(`/messages/${conversationId}`)).data
);

export const addMessage = createAsyncThunk(
  '/messages/add',
  async (newMessage: Message) => 
    (await axios.post(`/messages`, {...newMessage})).data
)
