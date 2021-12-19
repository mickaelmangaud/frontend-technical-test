import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users`);
    return data.map(({ token, ...user }) => (user));
  }
)