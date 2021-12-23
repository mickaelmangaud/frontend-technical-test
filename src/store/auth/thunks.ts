import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../utils';

interface ILoginPayload {
  username: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginPayload) => {
    /* tout ceci est un peu tordu, et devrait être fait sur le backend */
    const { data: users } = await axios.get(`/users`);
    
    const user = users.find((user: User) => 
      user.nickname.toLowerCase() === credentials.username.toLowerCase()
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.token.toLowerCase() === credentials.password.toLocaleLowerCase()) {
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
    
  }
);

/* Pareil ici */
export const logout = createAsyncThunk('auth/logout', async () => null);
