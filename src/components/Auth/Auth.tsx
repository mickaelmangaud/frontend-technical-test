import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { login, resetError } from '../../store/auth';

export function Auth() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { error } = useSelector((state:RootState) => state.auth);

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({username, password}));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(resetError());
    if (e.currentTarget.name === "username") {
      setUsername(e.currentTarget.value);
    }

    if (e.currentTarget.name === "password") {
      setPassword(e.currentTarget.value);
    }
  }
  
  return (
    <div id="auth">
      <form onSubmit={loginUser}>
        <h1>Leboncoin</h1>
        <input
          type="text"
          placeholder="Nickname..."
          value={username}
          name="username"
          onChange={onInputChange}
        />
        <input
          type="password"
          placeholder="Password... "
          value={password}
          name="password"
          onChange={onInputChange}
        />
        <button type="submit">LOGIN</button>
        {error && (
          <p className="error">{error}</p>
        )}
      </form>
    </div>
  )
}