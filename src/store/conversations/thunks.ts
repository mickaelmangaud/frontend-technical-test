import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllConversations = createAsyncThunk<any, number>(
  'conversatins/getAll',
  async (recipentId) => 
    (await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/conversations/${recipentId}`)).data
);

export const addNew = createAsyncThunk(
  'conversations/add',
  async (newConversation: Conversation) =>
    (await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/conversations`, { ...newConversation })).data
);

export const deleteOne = createAsyncThunk(
  'conversations/delete',
  async (conversationId: number) => {
    console.log('conversationId', conversationId)
  const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/conversation/${conversationId}`)
  console.log(data);
    return data
  }
);