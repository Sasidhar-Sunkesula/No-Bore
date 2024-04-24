import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    value: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.value = !state.value;
    },
    closeMenu: (state) => {
      state.value = false;
    },
  },
});

export const { toggleMenu, closeMenu } = menuSlice.actions;

export default menuSlice.reducer;
