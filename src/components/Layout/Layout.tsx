import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Auth } from '../Auth';

export function Layout({ children }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [userLoaded, setUserLoaded] = useState(null)

  /* Permet au refresh de ne renvoyer l'UI que lorsque l'utilisateur a été récupéré depuis redux
  *  sans ça, les styles sont brisés, il doit y avoir un moyen de gérer ça autrement avec nextjs
  *  mais pour le moment je sais pas.
  */
  useEffect(
    () => user !== null && setUserLoaded(user),
    [user])
  ;
  
  return (
    <div id="layout">
      {userLoaded !== null 
        ? children
        : <Auth />
      }
    </div>
  )
}