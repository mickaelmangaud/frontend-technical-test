export function ConversationHeader({ goToConversations, getFriend }: IConversationHeaderProps) {
  return (
    <div className="header">
      <div className="back" onClick={goToConversations}>
        &lt;
      </div>
      <div className="with">
        <p>Conversation avec {getFriend}</p>
      </div>
    </div>
  )
}