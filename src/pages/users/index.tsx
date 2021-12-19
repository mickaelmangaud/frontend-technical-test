import { useEffect } from "react";
import { useAppDispatch } from "../../store"
import { getAllUsers } from "../../store/users/thunks";

export default function Users() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [])

  return (
    <div>Users</div>
  )
}