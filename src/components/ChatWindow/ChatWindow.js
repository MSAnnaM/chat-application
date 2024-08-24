import React, { useEffect, useRef } from "react";
import style from "./ChatWindow.module.css";

const ChatWindow = ({ chat, messages, newMessage, setNewMessage, onSend }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!chat) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); // Запобігає перезавантаженню сторінки
    onSend();
  };

  return (
    <div className={style.window}>
      <h2>
        Chat with {chat.firstName} {chat.lastName}
      </h2>
      <div className={style.messages}>
        {messages.map((msg, index) => (
          <div
            className={`${style.messageItem} ${
              msg.sender === "User" ? style.userMessage : style.botMessage
            }`}
            key={index}
          >
            <p className={style.senderName}>{msg.sender}</p> 
            <p className={style.messageText}>{msg.text}</p> 
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className={style.messageInput}
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className={style.sendButton}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
