import { createSlice } from "@reduxjs/toolkit";

const videoListSlice = createSlice({
  name: "videoList",
  initialState: {
    value: [],
  },
  reducers: {
    setList: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setList } = videoListSlice.actions;
export default videoListSlice.reducer;
