import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadChats,
  createNewChat,
  deleteChat,
  setSelectedChat,
  sendNewMessage,
  addMessage,
  // updateChat,
} from "../redux/chatSlice";
import ChatList from "../components/ChatList/ChatList";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import ChatForm from "../components/ChatForm/ChatForm";
import Search from "../components/ChatSearch/ChatSearch";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import styles from "./ChatPage.module.css";
import Placeholder from "../components/Placeholder/Placeholder";

const socket = io("http://localhost:3005");

function ChatPage() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.chats);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const messages = useSelector((state) => state.chats.messages);

  const [newChat, setNewChat] = useState({ firstName: "", lastName: "" });
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(loadChats());

    const handleNewMessage = (message) => {
      toast.info(`New message from ${message.sender}: ${message.text}`);
      dispatch(addMessage(message));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch, selectedChat]);

  const handleCreateChat = () => {
    dispatch(createNewChat(newChat));
    setNewChat({ firstName: "", lastName: "" });
  };

  

  const handleRemoveChat = (id) => {
    dispatch(deleteChat(id));
  };

  const handleSelectChat = (chat) => {
    dispatch(setSelectedChat(chat));
  };

  const handleSendMessage = () => {
    if (selectedChat && newMessage.trim()) {
      const userMessage = { text: newMessage, sender: "User" };
      dispatch(addMessage(userMessage));
      dispatch(sendNewMessage(selectedChat._id, userMessage));
      setNewMessage("");
    }
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.chatContainer}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
      <aside className={styles.sidebar}>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ChatList
          chats={filteredChats}
          onSelect={handleSelectChat}
          onRemove={handleRemoveChat}
        />
        <ChatForm
          newChat={newChat}
          setNewChat={setNewChat}
          onCreate={handleCreateChat}
        />
      </aside>
      <div className={styles.chatPanel}>
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSend={handleSendMessage}
          />
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
}

export default ChatPage;
