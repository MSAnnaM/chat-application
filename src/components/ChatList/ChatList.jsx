import React from "react";
import { useState } from "react";
import styles from "./ChatList.module.css";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import EditChatModal from "../EditChat/EditChat";
import DeleteModal from "../DeleteModal/DeleteModal";

const ChatList = ({ chats, onSelect, onRemove }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatToDelete, setChatToDelete] = useState(null);

  const handleEditClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleCloseModal = () => {
    setSelectedChat(null);
  };

  const handleDeleteClick = (chatId) => {
    setChatToDelete(chatId);
  };

  const handleConfirmDelete = () => {
    onRemove(chatToDelete);
    setChatToDelete(null);
  };

  const handleCancelDelete = () => {
    setChatToDelete(null);
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
            <button
              className={styles.listBtn}
              onClick={() => handleDeleteClick(chat._id)}
            >
              <FaRegTrashAlt className={styles.icon} />
            </button>
          </div>
          {chatToDelete && (
            <DeleteModal
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
      ))}
      {selectedChat && (
        <EditChatModal chat={selectedChat} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ChatList;
