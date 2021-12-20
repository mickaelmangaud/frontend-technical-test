import { useEffect, useMemo, useState, useRef } from 'react';
import router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Message, NewMessage } from '../../components/';
import { RootState, useAppDispatch } from '../../store';
import { getAllMessages, addMessage } from '../../store/messages/thunks';
import { format } from 'date-fns';

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
    if (newMessage !== '') {
      const newMessageId = Date.now();
      dispatch(addMessage({
        id: newMessageId,
        conversationId: Number(query.id),
        authorId: user.id,
        timestamp: Date.now(),
        body: newMessage
      }));
    }
  }

  const getFriend: string = useMemo(() => {
    const conv: Conversation = conversations[Number(query.id)];
    if (conv) {
      return conv.recipientNickname === user.nickname 
      ? conv.senderNickname 
      : conv.recipientNickname;
    }
    return ''
  }, [messages])

  const goToConversations = () => router.push('/')

  const getMessageDate = (timestamp: number) => 
    format(new Date(timestamp), 'dd/MM/yyyy à HH:mm:ss');

  useEffect(() => {
    dispatch(getAllMessages(Number(query.id)));
  }, [query]);

  return (
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
  );
}
