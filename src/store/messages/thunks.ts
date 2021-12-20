import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllMessages = createAsyncThunk(
  'messages/getAll',
  async (conversationId: number, thunkAPI) =>
    (await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/messages/${conversationId}`)).data
);

export const addMessage = createAsyncThunk(
  '/messages/add',
  async (newMessage: Message) => 
    (await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/messages`, {...newMessage})).data
)
