interface IMessageProps {
  message: Message;
  getMessageDate: (messageDate: number) => void;
  getSender: (authorId: number) => void;
}