import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { getAllConversations } from '../../store/conversations/thunks';
import { getAllUsers } from '../../store/users/thunks';

export default function Conversations() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { entities: conversations } = useSelector((state: RootState) => state.conversations);

  const goToConversation = (conversationId) => router.push(`/conversations/${conversationId}`);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllConversations(user.id));
  }, []);

  return (
    <div>
      {Object.values(conversations).map((conversation: Conversation) => (
        <div
          key={conversation.id}
          className="conversation"
          onClick={() => goToConversation(conversation.id)}
        >
          <p>Last message: {conversation.lastMessageTimestamp}</p>
          <p>Contact: {conversation.senderNickname}</p>
        </div>
      ))}
    </div>
  );
}
