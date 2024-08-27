import React from "react";
import styles from "./LoginBtn.module.css";

const LoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "https://chat-app-api-production-8dc6.up.railway.app/auth/google";
  };

  return (
    <button onClick={handleGoogleLogin} className={styles.googleLoginButton}>
      Login with Google
    </button>
  );
};

export default LoginButton;
