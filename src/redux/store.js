import { configureStore } from '@reduxjs/toolkit';  
import chatReducer from './chatSlice';  

const store = configureStore({  
  reducer: {  
    chats: chatReducer,  
  },  
});  

export default store;