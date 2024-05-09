import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WatchLaterState {
  value: any[]; 
}

const initialState: WatchLaterState = {
  value: [],
};

const watchLater = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    watchList: (state, action: PayloadAction<any[]>) => {
      state.value = action.payload;
    },
    addToList: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload);
    },
    removeFromList: (state, action: PayloadAction<number>) => {
      state.value.splice(action.payload, 1);
    },
  },
});

export const { addToList, removeFromList, watchList } = watchLater.actions;
export default watchLater.reducer;
