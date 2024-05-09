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
    openMenu: (state) => {
      state.value = true;
    },
  },
});

export const { toggleMenu, closeMenu, openMenu } = menuSlice.actions;

export default menuSlice.reducer;
