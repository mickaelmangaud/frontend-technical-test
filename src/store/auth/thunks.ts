import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  'auth/login',
  async (username: string, thunkAPI) => {
    const { data: users } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users`);
    return users.find((user: User) => user.nickname === username);
  }
)