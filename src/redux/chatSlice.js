import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChats,
  createChat,
  removeChat,
  sendMessage,
  editChat,
  fetchUser,
} from "../api/chatApi";
import { loadUser } from "./userSlice";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    selectedChat: null,
    messages: [],
    isLoading: false,
  },
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
      state.messages = action.payload.messages || [];
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    clearChats(state) {
      state.chats = [];
      state.selectedChat = null;
      state.messages = [];
    },
  },
});

export const { setChats, setSelectedChat, addMessage, clearChats } = chatSlice.actions;

export const loadChats = () => async (dispatch) => {
  try {
    const user = await fetchUser();
    if (user) {
      await dispatch(loadUser());
      const userChats = await fetchChats();
      dispatch(setChats(userChats));
      return;
    }
    const chats = await fetchChats();

    dispatch(setChats(chats));
  } catch (er) {
    console.log(er);
  }
};

export const createNewChat = (chatData) => async (dispatch) => {
  try {
      
    await createChat(chatData);
    dispatch(loadChats());
  } catch (er) {
    console.log(er);
  }
};

export const updateChat = (id, data) => async (dispatch) => {
  try {
    await editChat(id, data);
    dispatch(loadChats());
  } catch (er) {
    console.log(er);
  }
};

export const deleteChat = (id) => async (dispatch) => {
  try {
    await removeChat(id);
    dispatch(loadChats());
  } catch (er) {
    console.log(er);
  }
};

export const sendNewMessage = (chatId, messageData) => async () => {
  try {
    await sendMessage(chatId, messageData);
  } catch (er) {
    console.log(er);
  }
};

export default chatSlice.reducer;
