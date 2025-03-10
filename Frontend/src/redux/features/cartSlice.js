import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  clearCart,
  removeFromCart,
  updateCart,
} from "../actions/cartActions";

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cartLoading: false,
    success: false,
    cart: null,
    cartError: null,
  },
  reducers: {
    clearCartErrors(state) {
      state.cartError = null;
    },
    removeCartReset(state) {
      state.cartLoading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.cartLoading = true;
        state.success = false;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.cartLoading = false;
        state.success = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.success = false;
        state.cartError = action.payload;
      })
      .addCase(getCart.pending, (state) => {
        state.cartLoading = true;
        state.success = false;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.success = false;
        state.cart = null;
        state.cartError = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.cartLoading = true;
        state.success = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.success = true;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.success = false;
        state.cartError = action.payload;
      });
  },
});

export const cartDeleteReducer = createSlice({
  name: "removeCartItem",
  initialState: {
    loading: false,
    success: false,
    cartError: null,
  },
  reducers: {
    clearCartErrors(state) {
      state.cartError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFromCart.pending, getCart.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.cartError = action.payload;
      });
  },
});

export const { clearCartErrors, removeCartReset } = cartReducer.actions;
