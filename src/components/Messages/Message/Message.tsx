import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export function Message({ message, getMessageDate, getSender }) {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div
      className={`message ${message.authorId === user.id && "own"}`}
      key={message.id}
    >
      <p className="body">{message.body}</p>
      <p className="sender">
        {getSender(message.authorId)} le {getMessageDate(message.timestamp)}
      </p>
    </div>
  );
}
