import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./EditChat.module.css";
import { useDispatch } from "react-redux";
import { updateChat } from "../../redux/chatSlice";

const EditChatModal = ({ chat, onClose }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(chat.firstName);
  const [lastName, setLastName] = useState(chat.lastName);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateChat(chat._id, { ...chat, firstName, lastName }));
    onClose();
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Edit Chat</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
          <button type="button" className={styles.canclelBtn} onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditChatModal;
