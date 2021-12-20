export function Message({ message, user, getMessageDate, getSender }) {
  return (
    <div className={`message ${message.authorId === user.id && 'own'}`} key={message.id}>
      <p className="body">{message.body}</p>
      <p className="sender">{getSender(message.authorId)} le {getMessageDate(message.timestamp)}</p>
    </div>
  )
}