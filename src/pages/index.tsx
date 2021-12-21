import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getAllConversations } from '../store/conversations/thunks';
import { getAllUsers } from '../store/users/thunks';
import { toggleUsersDisplayed } from '../store/app'
import { ConversationList, Logout, NewConversationBtn, Users } from '../components';

export default function Conversations() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { entities } = useSelector((state: RootState) => state.conversations);

  console.log(Object.values(entities).sort((a, b) => a.lastMessageTimestamp - b.lastMessageTimestamp))

  const conversations = useMemo(
    () => Object.values(entities).sort((a, b) => a.lastMessageTimestamp - b.lastMessageTimestamp),
    [entities]
  );

  const toggleContactList = () =>
    dispatch(toggleUsersDisplayed({}));

  const goToConversation = (conversationId: number) =>
    router.push(`/conversations/${conversationId}`);

  useEffect(() => {
    dispatch(getAllConversations(user?.id));
    dispatch(getAllUsers());
  }, []);

  return (  
    <div id="conversations">
      <Logout />
      <NewConversationBtn 
        toggleContactList={toggleContactList}
      />
      <ConversationList
        conversations={conversations}
        user={user}
        goToConversation={goToConversation}
      />    
      <Users />
    </div>  
  );
}
