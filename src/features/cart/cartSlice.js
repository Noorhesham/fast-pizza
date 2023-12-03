import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart(state, action) {
      state.cart.push(action.payload);
    },
    deleteItemCart(state, action) {
      //   const item=state.cart.findIndex(item=>item.pizzaId===action.payload)
      //   state.cart.splice(item,1)
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if(item.quantity===0) cartSlice.caseReducers.deleteItemCart(state,action)
    },
    clear(state) {
      state.cart = [];
    },
  },
});

export const {
  addtoCart,
  deleteItemCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clear,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getQuantityById=id=>state=>state.cart.cart.find(item=>item.pizzaId===id)?.quantity??0
export const getTotalCartPrice=(state)=>state.cart.cart.reduce((prev,acc)=>acc.totalPrice+prev,0)
export const getTotalCartQuantity=(state)=>state.cart.cart.reduce((prev,acc)=>acc.quantity+prev,0)