interface IConversationListProps {
  conversations: Conversation[];
  user: User;
  goToConversation: (conversationId: number) => void;
}