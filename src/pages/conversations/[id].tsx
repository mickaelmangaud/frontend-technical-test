import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { getAllMessages } from '../../store/messages/thunks';

export default function Conversation() {
  const dispatch = useAppDispatch();
  const { entities } = useSelector((state: RootState) => state.messages);
  const { query } = useRouter();

  const messages = useMemo(() => Object.values(entities), [entities]);

  useEffect(() => {
    dispatch(getAllMessages(Number(query.id)));
  }, [query]);

  return (
    <div id="messages">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div className="message" key={message.id}>
            <p>{message.body}</p>
            <p>{message.timestamp}</p>
          </div>
        ))
      ) : (
        <p>Aucun message dans cette conversation</p>
      )}

      <input type="text" />
      <button>Send Message</button>
    </div>
  );
}
