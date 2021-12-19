import { useEffect } from "react";
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store"
import { getAllConversations } from "../../store/conversations/thunks";

export default function Conversations() {
  const dispatch = useAppDispatch();
  const { entities } = useSelector((state: RootState) => state.conversations);
  
  useEffect(() => {
    dispatch(getAllConversations(1));
  }, []);

  return (
    <div>
      Conversations
    </div>
  )
} 