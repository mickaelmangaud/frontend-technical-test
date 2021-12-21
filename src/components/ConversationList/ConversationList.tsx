import { ConversationCard } from '..';

export function ConversationList({ conversations, user, goToConversation}) {
  return (
    <div className="conversations-list">
        {conversations.length ? (
          conversations.map((conversation: Conversation) => (
            <ConversationCard
              key={conversation.id}
              onClick={() => goToConversation(conversation.id)}
              user={user}
              conversation={conversation}
            />
          ))
        ) : (
          <p>Aucune conversation</p>
      )}
      </div>
  )
}