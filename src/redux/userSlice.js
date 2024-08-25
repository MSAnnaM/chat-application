import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, logout } from "../api/chatApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: '',
    email: '',
    isUser: false,
  },
  reducers: {
    setUser(state, action) {
          state.name = action.payload.name;
          state.isUser = true;
      },
      unsetUser(state) {
      state.name = '';
      state.email = '';
      state.isUser = false;
    },
  },
});

 

export const { setUser, unsetUser } = userSlice.actions;

export const loadUser = () => async (dispatch) => {
  try {
      const user = await fetchUser();

    dispatch(setUser(user));
  } catch (er) {
    console.log(er);
  }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await logout();
        dispatch(unsetUser());
    }
    catch (er) {
        console.log(er);
        
    }
}

export default userSlice.reducer;