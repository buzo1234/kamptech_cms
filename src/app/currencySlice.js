import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "usd",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload.currency;
    },
  },
});

export const { changeCurrency } = currencySlice.actions;

export const getCurrency = (state) => state.currency;

export default currencySlice.reducer;
