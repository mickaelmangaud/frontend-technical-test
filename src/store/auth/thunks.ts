import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users`);
    return data;
  }
)