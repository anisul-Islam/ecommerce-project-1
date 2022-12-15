import { createSlice } from "@reduxjs/toolkit";

const data =
  localStorage.getItem("cart") !== null
    ? JSON.parse(String(localStorage.getItem("cart")))
    : [];

const initialCart = {
  cartItems: data,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    setCart: (state, action) => {
      state.cartItems.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    deleteCartItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== id
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeAllCartItems: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

// export reducer and action createor
// Action creators are generated for each case reducer function
export const { setCart, deleteCartItem, removeAllCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
