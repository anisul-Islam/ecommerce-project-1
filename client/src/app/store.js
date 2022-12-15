import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
export default store;
