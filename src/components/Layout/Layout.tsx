import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Auth } from '../Auth';

export function Layout({ children }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [userLoaded, setUserLoaded] = useState(null)

  /*  */
  useEffect(() => user !== null && setUserLoaded(user), [user])
  
  return (
    <div id="layout">
      {userLoaded !== null 
        ? children
        : <Auth />
      }
    </div>
  )
}