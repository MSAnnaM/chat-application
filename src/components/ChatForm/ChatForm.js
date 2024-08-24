import React from 'react'; 

import style from "./ChatForm.module.css";

const ChatForm = ({ newChat, setNewChat, onCreate }) => {  
  const handleSubmit = (e) => {
    e.preventDefault(); // Запобігає перезавантаженню сторінки
    onCreate();
  };
  return (  
    <form className={style.chatForm} onSubmit={handleSubmit}>  
      <input   
        className={style.chatInput}
        type="text"   
        placeholder="First Name"   
        value={newChat.firstName}   
        onChange={(e) => setNewChat({ ...newChat, firstName: e.target.value })}   
      />  
      <input   
        className={style.chatInput}
        type="text"   
        placeholder="Last Name"   
        value={newChat.lastName}   
        onChange={(e) => setNewChat({ ...newChat, lastName: e.target.value })}   
      />  
      <button className={style.chatBtn} type="submit">Create Chat</button>  
    </form>  
  );  
};  

export default ChatForm;