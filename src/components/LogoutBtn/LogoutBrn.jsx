import React from 'react';
import styles from './LogoutBtn.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
      dispatch(logoutUser());
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
