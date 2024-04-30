import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import videoListSlice from "./videoListSlice";

const dataStore = configureStore({
  reducer: {
    menu: menuReducer,
    search: searchSlice,
    chat: chatSlice,
    user: userSlice,
    theme: themeSlice,
    videoList: videoListSlice,
  },
});

export default dataStore;
