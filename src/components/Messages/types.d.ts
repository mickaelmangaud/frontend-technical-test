interface IMessagesProps {
  messages: Message[];
  getMessageDate: (messageDate: number) => void;
  getSender: (userId: number) => void;
}