import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllConversations = createAsyncThunk<any, number>(
  'conversatins/getAll',
  async (recipentId, thunkAPI) => 
    (await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/conversations/${recipentId}`)).data
)