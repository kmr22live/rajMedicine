import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import cartSlice from "./CartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
