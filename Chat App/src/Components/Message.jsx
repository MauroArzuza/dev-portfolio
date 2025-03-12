const Message = ({ message }) => {
  return (
    <article className="message">
      <div>
        <div className="text-message">
          <p className="text">{message.text}</p>
        </div>
      </div>
    </article>
  );
};

export default Message;
