import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Auth } from '../Auth';

export function Layout({ children }) {
  const { user } = useSelector((state: RootState) => state.auth);

  console.log('user in layoput', user)
  return !user ? (
      <Auth />
    ): (
      <div id="layout">
        {children}
      </div>
    )
}