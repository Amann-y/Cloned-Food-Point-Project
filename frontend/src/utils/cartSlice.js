import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item._id === action.payload._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.cart.push(action.payload);
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    minusFromCart: (state, action) => {
      state.cart = state.cart.map((ele) =>
        ele._id == action.payload._id && ele.qty > 1
          ? { ...ele, qty: ele.qty - 1 }
          : ele
      );
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    emptyCart : (state)=>{
      state.cart = []
    },

    removeFromCart :  (state,action) =>{
      state.cart = state.cart.filter((ele)=>{
        return  ele._id!==action.payload._id
      })
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
});

export const { addToCart,minusFromCart,emptyCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
