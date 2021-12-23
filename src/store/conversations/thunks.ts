import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../utils';

export const getAllConversations = createAsyncThunk(
  'conversatins/getAll',
  async (recipentId: number) => 
    (await axios.get(`/conversations/${recipentId}`)).data
);

export const addNew = createAsyncThunk(
  'conversations/add',
  async (newConversation: Conversation) =>
    (await axios.post(`/conversations`, { ...newConversation })).data
);