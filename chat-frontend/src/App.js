// src/App.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3005');

function App() {
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState({ firstName: '', lastName: '' });
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchChats();
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
      showToast(message);
    });
  }, []);

  const fetchChats = async () => {
    const response = await fetch('http://localhost:3005/api/chats/');
    const data = await response.json();
    setChats(data);
  };

  const createChat = async () => {
    await fetch('http://localhost:3005/api/chats/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newChat),
    });
    fetchChats();
    setNewChat({ firstName: '', lastName: '' });
  };

  const removeChat = async (id) => {
    if (window.confirm('Are you sure you want to remove this chat?')) {
      await fetch(`http://localhost:3005/api/chats/${id}`, { method: 'DELETE' });
      fetchChats();
    }
  };

  const sendMessage = async (chatId, message) => {
    socket.emit('sendMessage', { chatId, message });
    setTimeout(async () => {
      const response = await fetch(`https://api.quotable.io/random`);
      const data = await response.json();
      socket.emit('message', { chatId, message: data.content });
    }, 3000);
  };

  const showToast = (message) => {
    alert(`New message: ${message}`);
  };

  const filteredChats = chats.filter(chat => 
    chat.firstName.includes(searchTerm) || chat.lastName.includes(searchTerm)
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search chats..." 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <div>
        {filteredChats.map(chat => (
          <div key={chat._id}>
            <h3>{chat.firstName} {chat.lastName}</h3>
            <button onClick={() => removeChat(chat._id)}>Remove</button>
            <button onClick={() => sendMessage(chat._id, 'Hello!')}>Send Message</button>
          </div>
        ))}
      </div>
      <input 
        type="text" 
        placeholder="First Name" 
        value={newChat.firstName} 
        onChange={(e) => setNewChat({ ...newChat, firstName: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Last Name" 
        value={newChat.lastName} 
        onChange={(e) => setNewChat({ ...newChat, lastName: e.target.value })} 
      />
      <button onClick={createChat}>Create Chat</button>
    </div>
  );
}

export default App;
