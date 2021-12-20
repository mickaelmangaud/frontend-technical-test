import router, { useRouter } from 'next/router';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { RootState, useAppDispatch } from '../../store';
import { getAllMessages, addMessage } from '../../store/messages/thunks';
import { format } from 'date-fns';
import { Message } from '../../components/Message';
import { NewMessage } from '../../components/NewMessage';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export default function Conversation() {
  const [newMessage, setNewMessage] = useState<string>('');
  const { entities } = useSelector((state: RootState) => state.messages);
  const { user } = useSelector((state: RootState) => state.auth);
  const { entities: users } = useSelector((state: RootState) => state.users);
  const { entities: conversations } = useSelector((state: RootState) => state.conversations);
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  
  const messages = useMemo(() => Object.values(entities), [entities]);

  const getSender = (userId: number) => 
    Object.values(users).find(user => user.id === userId).nickname;
  
  const addMessageToConversation = (e) => {
    e.preventDefault();
    const newMessageId = Date.now();
    dispatch(addMessage({
      id: newMessageId,
      conversationId: Number(query.id),
      authorId: user.id,
      timestamp: Date.now(),
      body: newMessage
    }));
  }

  const getFriend: string = useMemo(() => {
    const conv: Conversation = conversations[Number(query.id)];
    return conv.recipientNickname === user.nickname 
      ? conv.senderNickname 
      : conv.recipientNickname;
  }, [messages])

  const goToConversations = () => router.push('/conversations')

  const getMessageDate = (timestamp: number) => 
    format(new Date(timestamp), 'dd/MM/yyyy à HH:mm:ss');

  useEffect(() => {
    dispatch(getAllMessages(Number(query.id)));
  }, [query]);

  return (
    <ScreenWrapper>
      <div id="conversation">
        <div className="header">
          <div className="back" onClick={goToConversations}>
            &lt;
          </div>
          <div className="with">
            <p>Conversation avec {getFriend}</p>
          </div>
        </div>

        <div className="messages">
          
          {messages.length > 0 ? (
            messages.map((message) => (
              <Message 
                key={message.id}
                user={user}
                message={message}
                getMessageDate={getMessageDate}
                getSender={getSender}
              />
              ))
              ) : (
                <p>Aucun message dans cette conversation</p>
                )}
            <AlwaysScrollToBottom />
        </div>

        <NewMessage
          addMessageToConversation={addMessageToConversation}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      </div>
    </ScreenWrapper>
  );
}
