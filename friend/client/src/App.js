import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./components/ChatMessage";
import { ShowErrorDialog } from "./utils/Utils";
import Thinking from "./components/Thinking";
import NavigationBar from './components/NavigationBar';

// Importing necessary modules and components

// Define the main App component
function App() {
  // State variables
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  // References
  const currentModel = "gpt-3.5-turbo";
  const inputRef = useRef();
  const messagesEndRef = useRef();

  // Function to scroll to the bottom of the chat log
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize the chat log with a default message
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "How can I help you today?",
    },
  ]);

  // Function to clear the chat log
  function clearChat() {
    fetch("http://localhost:3010/clear")
      .then((res) => {
        setChatLog([
          {
            user: "gpt",
            message: "How can I help you today?",
          },
        ]);
        res.json();
      })
      .catch((error) => {
        console.error(error);
        ShowErrorDialog(error);
      });
  }

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);
    setThinking(true);

    try {
      const response = await fetch("http://localhost:3010/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          currentModel,
        }),
      });

      if (!response.ok) {
        throw new Error("An error occurred while processing the request.");
      }

      const data = await response.json();

      setThinking(false);

      // Append the response message to the chat log
      setChatLog([
        ...chatLogNew,
        { user: "gpt", message: `${data.message.content}` },
      ]);
    } catch (error) {
      console.error(error);
      ShowErrorDialog(error);
    }
  }

  // Scroll to the bottom of the chat log whenever it changes
  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  // Set focus on the input field when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Render the App component
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <NavigationBar />
      <section className="chatbox">
        <div className="chat-log">
          {/* Render each chat message */}
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {/* Render the thinking indicator if necessary */}
          {thinking && <Thinking />}
          <span ref={messagesEndRef}></span>
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input placeholder="Enter your diary prompt here..."
              ref={inputRef}
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

// Export the App component as the default export
export default App;
