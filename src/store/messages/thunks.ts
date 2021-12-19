import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMessages = createAsyncThunk(
  'messages/getAll',
  async (conversationId: number, thunkAPI) => 
    (await (axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/messages/1`))).data
)