import { useEffect, useRef } from 'react';
import { Message } from '..';

export function Messages({ messages, getMessageDate, getSender }: IMessagesProps) {
  return (
    <div className="messages">
      {messages.length ? (
        messages.map((message: Message) =>
          <Message
            key={message.id}
            message={message}
            getMessageDate={getMessageDate}
            getSender={getSender}
          />
        )
      ) : (
        <p>Aucun message dans cette conversation</p>
      )}
      <AlwaysScrollToBottom />
    </div>
  );
}

/* Permet de faire scroller la conversation vers le dernier mesage automatiquement
* trouvé sur stackoverflow
*/
const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};
