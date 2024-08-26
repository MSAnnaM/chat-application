import React from 'react';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onCancel}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h3>Are you sure you want to delete this chat?</h3>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onConfirm}>Yes</button>
          <button className={styles.cancelButton} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
