import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "./constants";

interface ChatState {
  messages: Array<{ name: string; message: string }>;
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ name: string; message: string }>) => {
      state.messages.splice(LIVE_CHAT_COUNT, 1);
      state.messages.unshift(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
