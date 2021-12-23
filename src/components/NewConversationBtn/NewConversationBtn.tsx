export function NewConversationBtn({ toggleContactList }: INewConversationBtnProps) {
  return (
    <button
      className="new-conversation-btn"
      onClick={toggleContactList}>
      <p>New Conversation</p>
    </button>
  )
}