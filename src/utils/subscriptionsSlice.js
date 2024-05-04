import { createSlice } from "@reduxjs/toolkit";

const SubscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {
    value: [],
  },
  reducers: {
    setsubscriptionsList: (state, action) => {
      // Here, we are re assigning the part of the state technically this means we are mutating the state, but not the whole state so need not to return
      state.value = action.payload;
    },
    addToSubscriptionsList: (state, action) => {
      state.value.push(action.payload);
    },
    removeFromSubscriptionsList: (state, action) => {
      state.value.splice(action.payload, 1);
    },
  },
});
export const {
  setsubscriptionsList,
  addToSubscriptionsList,
  removeFromSubscriptionsList,
} = SubscriptionsSlice.actions;
export default SubscriptionsSlice.reducer;
