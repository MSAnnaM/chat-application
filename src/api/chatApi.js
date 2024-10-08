import axios from "axios";
const api = axios.create({
  // baseURL: "http://localhost:3005/api/",
  baseURL: 'https://chat-app-api-production-8dc6.up.railway.app/api/',
});
export const fetchUser = async () => {
  const response = await api.get("user", {
    withCredentials: true,
  });

  return response.data;
};

export const logout = async () => {
  await api.get("logout", {
    withCredentials: true,
  });
};

export const fetchChats = async () => {
  const response = await api.get("/chats", {
    withCredentials: true,
  });

  return response.data;
};

export const createChat = async (chatData) => {
  await api.post(
    `chats/create`,
    chatData,
    {
      withCredentials: true,
    }
    
  );
};

export const editChat = async (chatId, chatData) => {
  const response = await api.patch(`chats/${chatId}`, chatData);
  return response.data;
};

export const removeChat = async (chatId) => {
  await api.delete(`chats/${chatId}`);
};

export const sendMessage = async (chatId, messageData) => {
  const response = await api.post(`chats/${chatId}/messages`, messageData);

  return response.data;
};
