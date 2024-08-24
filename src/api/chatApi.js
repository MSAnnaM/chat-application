// src/api/chatApi.js  
import axios from 'axios';  
const api = axios.create({
  baseURL: 'http://localhost:3005/api/chats',
});

export const fetchChats = async () => {  
  const response = await api.get("/");  

  return response.data;  
};  

export const createChat = async (chatData) => {  
  await api.post(`/create`, chatData);
}; 

export const editChat = async (chatId, chatData) => {
  const response = await api.patch(`/${chatId}`, chatData);
  return response.data;
}

export const removeChat = async (chatId) => {  
  await api.delete(`/${chatId}`);  
};  

export const sendMessage = async (chatId, messageData) => {  
  const response = await api.post(`/${chatId}/messages`, messageData);

  return response.data;  
};