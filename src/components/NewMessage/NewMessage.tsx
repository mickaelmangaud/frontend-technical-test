export function NewMessage({ addMessageToConversation, newMessage, setNewMessage}: NewMessageProps) {
  const updateInput = (e) => setNewMessage(e.currentTarget.value);
  
  return (
    <form className="new-message" onSubmit={addMessageToConversation} id="new-message">
      <input
        type="text"
        value={newMessage}
        autoFocus
        onChange={updateInput}
      />
      <button type="submit">
        Send Message
      </button>
    </form>
  )
}