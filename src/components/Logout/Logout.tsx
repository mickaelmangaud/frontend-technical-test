import { useRouter } from 'next/router';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/auth/thunks';

export function Logout() {
  const dispatch = useAppDispatch();
  const router = useRouter()

  const logUserOut = () => {
    dispatch(logout());
    router.reload();
  };

  return (
    <div onClick={logUserOut}>Logout</div>
  )
}