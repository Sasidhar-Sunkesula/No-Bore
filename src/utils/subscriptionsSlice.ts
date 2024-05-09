import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionsState {
  value: any[]; 
}

const initialState: SubscriptionsState = {
  value: [],
};

const SubscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setsubscriptionsList: (state, action: PayloadAction<any[]>) => {
      state.value = action.payload;
    },
    addToSubscriptionsList: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload);
    },
    removeFromSubscriptionsList: (state, action: PayloadAction<number>) => {
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
