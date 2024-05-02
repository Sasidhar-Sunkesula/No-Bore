import { createSlice } from "@reduxjs/toolkit";

const watchLater = createSlice({
  name: "watchLater",
  initialState: {
    value: [],
  },
  reducers: {
    watchList: (state, action) =>{
      state.value = action.payload;
    },
    addToList: (state, action) => {
      state.value.push(action.payload);
    },
    removeFromList: (state, action) =>{
      state.value.splice(action.payload, 1);
    }
  },
});

export const { addToList, removeFromList,watchList } = watchLater.actions;
export default watchLater.reducer;
