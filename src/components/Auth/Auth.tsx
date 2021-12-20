import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth/thunks'

export function Auth() {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(login(nickname));
  }

  return (
    <div id="auth">
      <form onSubmit={loginUser}>
        <h1>Leboncoin</h1>
        <input
          type="text"
          placeholder="Nickname..."
          value={nickname}
          onChange={(e) => setNickname(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="Password... "
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}