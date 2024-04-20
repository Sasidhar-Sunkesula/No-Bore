import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";

const dataStore = configureStore({
  reducer: {
    menu: menuReducer,
    search : searchSlice,
    chat :chatSlice,
  },
});

export default dataStore;
