import { useEffect, useRef } from "react";
import { Message } from "..";

export function Messages({ messages, getMessageDate, getSender }) {
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

const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};
