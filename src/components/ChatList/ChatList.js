import React from "react";
import { useState } from "react";
import styles from "./ChatList.module.css";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import EditChatModal from "../EditChat/EditChat";

const ChatList = ({ chats, onSelect, onRemove }) => {
  const [selectedChat, setSelectedChat] = useState(null); // Стан для обраного чату

  // Функція для відкриття модалки
  const handleEditClick = (chat) => {
    setSelectedChat(chat); // Встановлення обраного чату
  };

  // Функція для закриття модалки
  const handleCloseModal = () => {
    setSelectedChat(null); // Скидання обраного чату
  };

    const handleRemoveChat = (chatId) => {  
    const confirmed = window.confirm("Are you sure you want to remove this chat?");  
    if (confirmed) {  
      onRemove(chatId); // Виклик функції видалення чату  
    }  
  };

  return (
    <div className={styles.chatListContainer}>
      {chats.map((chat) => (
        <div className={styles.chatList} key={chat._id}>
          <h3
            className={styles.chatTitle}
            onClick={() => onSelect(chat)}
            style={{ cursor: "pointer" }}
          >
            {chat.firstName} {chat.lastName}
          </h3>
          <div className={styles.actionBtns}>
          <button
            className={styles.editBtn}
            onClick={() => handleEditClick(chat)}
          >
            <FaEdit className={styles.icon} />
          </button>
          <button className={styles.listBtn} onClick={() => handleRemoveChat(chat._id)}>
            <FaRegTrashAlt className={styles.icon} />
            </button>
          </div>
        </div>
      ))}
      {selectedChat && (
        <EditChatModal chat={selectedChat} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ChatList;
