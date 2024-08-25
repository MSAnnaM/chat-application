import { configureStore } from '@reduxjs/toolkit';  
import chatReducer from './chatSlice';  
import userReducer from './userSlice';

const store = configureStore({  
  reducer: {  
    chats: chatReducer,  
    user: userReducer,
  },  
});  

export default store;