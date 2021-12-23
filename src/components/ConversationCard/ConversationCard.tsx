export function ConversationCard({ conversation, onClick, user }: IConversationCardProps) {
  return (
    <div
      key={conversation.id}
      className="conversation"
      onClick={onClick}>
      <p>Last message: {conversation.lastMessageTimestamp}</p>
      <p>Contact: 
        {conversation.senderNickname === user.nickname 
          ? conversation.recipientNickname
          : conversation.senderNickname
        }
      </p>
    </div>
  )
}
