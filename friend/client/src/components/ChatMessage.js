import Avatar from "./Avatar";

// ChatMessage component
const ChatMessage = ({ message }) => {

  // Check if the message is from the GPT user
  const isGptUser = message.user === "gpt";

  // Render the chat message
  return (
    <div className={`chat-message ${isGptUser ? "chatgpt" : "user"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${isGptUser ? "chatgpt" : "user"}`}>
          {/* Render the Avatar component */}
          <Avatar isGptUser={isGptUser}/>
        </div>
        <div className="message"> {message.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
