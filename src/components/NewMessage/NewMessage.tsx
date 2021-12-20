interface NewMessageProps {
  addMessageToConversation: (e: any) => void;
  newMessage: string;
  setNewMessage: (e: any) => void;
}

export function NewMessage({ addMessageToConversation, newMessage, setNewMessage}: NewMessageProps) {
  return (
    <form className="new-message" onSubmit={addMessageToConversation} id="new-message">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.currentTarget.value)}
      />
      <button type="submit">
        Send Message
      </button>
    </form>
  )
}