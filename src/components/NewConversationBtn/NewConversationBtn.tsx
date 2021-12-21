
export function NewConversationBtn({ toggleContactList }) {
  return (
    <button
      className="new-conversation-btn"
      onClick={toggleContactList}>
      <p>New Conversation</p>
    </button>
  )
}