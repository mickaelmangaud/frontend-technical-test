import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { NewMessage, Messages, ConversationHeader } from '../../components/';
import { RootState, useAppDispatch } from '../../store';
import { getAllMessages, addMessage } from '../../store/messages/thunks';
import { format } from 'date-fns';

export default function Conversation() {
  const [newMessage, setNewMessage] = useState<string>('');
  const { user } = useSelector((state: RootState) => state.auth);
  const { entities } = useSelector((state: RootState) => state.messages);
  const { entities: users } = useSelector((state: RootState) => state.users);
  const { entities: conversations } = useSelector((state: RootState) => state.conversations);
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const messages: Message[] = useMemo(() => Object.values(entities), [entities]);

  const getSender = (userId: number) => 
    Object.values(users).find((user: User) => user.id === userId)?.nickname;
  
  const goToConversations = () => router.push('/');

  const getMessageDate = (timestamp: number) => 
    format(new Date(timestamp), 'dd/MM/yyyy à HH:mm:ss');

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
    setNewMessage('');
  }

  const getFriend: string = useMemo(() => {
    const conv: Conversation = conversations[Number(query.id)];
    if (conv) {
      return conv.recipientNickname === user.nickname 
        ? conv.senderNickname 
        : conv.recipientNickname;
    }
  }, [messages]);

  useEffect(() => {
    dispatch(getAllMessages(Number(query.id)));
  }, [query]);

  return (
    <div id="conversation">
      <ConversationHeader 
        getFriend={getFriend}
        goToConversations={goToConversations}
      />
      <Messages
        messages={messages}
        getMessageDate={getMessageDate}
        getSender={getSender}
      />
      <NewMessage
        addMessageToConversation={addMessageToConversation}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
}
