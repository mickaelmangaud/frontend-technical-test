import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getAllConversations } from '../store/conversations/thunks';
import { getAllUsers } from '../store/users/thunks';
import { toggleUsersDisplayed } from '../store/app'
import { Users } from '../components/Users';
import { ConversationCard } from '../components';

export default function Conversations() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { entities } = useSelector((state: RootState) => state.conversations);

  const conversations =
    useMemo(() => Object.values(entities), [entities]);

  const goToConversation =
    (conversationId) => router.push(`/conversations/${conversationId}`);
  
  const toggleContactList = () =>
    dispatch(toggleUsersDisplayed({}));

  useEffect(() => {
    dispatch(getAllConversations(user.id));
    dispatch(getAllUsers());
  }, []);

  return (  
    <div id="conversations">
      <button
        className="new-conversation-btn"
        onClick={toggleContactList}
      >
        <p>New Conversation</p>
      </button>
      <div className="conversations-list">
        {conversations.length > 0 ? (
          conversations.map((conversation: Conversation) => (
            <ConversationCard
              key={conversation.id}
              onClick={() => goToConversation(conversation.id)}
              user={user}
              conversation={conversation}
            />
          ))
        ) : (
          <p>Aucune conversation</p>
      )}
      </div>
    <Users />
    </div>  
  );
}
