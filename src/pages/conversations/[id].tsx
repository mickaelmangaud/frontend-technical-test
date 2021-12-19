import { useEffect } from "react";
import { useAppDispatch } from "../../store"
import { getAllMessages } from "../../store/messages/thunks";

export default function Conversation() {
  const dispatch = useAppDispatch();
  console.log('ici')
  
  useEffect(() => {
    dispatch(getAllMessages(1));
  }, [])

  return (
    <div>
      Conversation
    </div>
  )
} 