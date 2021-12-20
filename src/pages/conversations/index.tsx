import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { getAllConversations } from '../../store/conversations/thunks';
import { getAllUsers } from '../../store/users/thunks';
import { toggleUsersDisplayed } from '../../store/app'

export default function Conversations() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { entities } = useSelector((state: RootState) => state.conversations);

  const conversations = useMemo(() => Object.values(entities), [entities]);
  const goToConversation = (conversationId) => router.push(`/conversations/${conversationId}`);
  const toggleContactList = () => dispatch(toggleUsersDisplayed({}));

  useEffect(() => {
    dispatch(getAllConversations(user.id));
    dispatch(getAllUsers());
  }, []);

  return (  
    <div>
      {conversations.length > 0 ? (
        conversations.map((conversation: Conversation) => (
          <div
            key={conversation.id}
            className="conversation"
            onClick={() => goToConversation(conversation.id)}
          >
            <p>Last message: {conversation.lastMessageTimestamp}</p>
            <p>Contact: {conversation.senderNickname === user.nickname ? conversation.recipientNickname : conversation.senderNickname}</p>
          </div>
        ))
      ) : (
        <p>Aucune conversation</p>
      )}

      <button onClick={toggleContactList}>New conversation</button>
    </div>
  );
}
