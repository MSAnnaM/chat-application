import React from 'react';
import styles from './LoginBtn.module.css';

const LoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3005/auth/google'; // Замініть URL на ваш серверний URL
  };

  return (
    <button onClick={handleGoogleLogin} className={styles.googleLoginButton}>
      Login with Google
    </button>
  );
};

export default LoginButton;
