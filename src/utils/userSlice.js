import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    watchList: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addToList: (state, action) => {
      state.watchList.push(action.payload);
    },
    removeFromList: (state, action) =>{
      state.watchList.splice(action.payload, 1);
    }
  },
});

export const { login, logout,addToList, removeFromList } = userSlice.actions;
export default userSlice.reducer;
