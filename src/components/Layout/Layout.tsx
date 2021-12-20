import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Auth } from '../Auth';

export function Layout({ children }) {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div id="layout">
      {user === null ? <Auth /> : children}
    </div>
  )
}