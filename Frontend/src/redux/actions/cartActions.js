import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      quantity = parseInt(quantity, 10);
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post(
        `/cart/create-cart`,
        { productId, quantity },
        config
      );
      if (data && data.success === false) {
        return rejectWithValue(data?.message || "Error in Adding Item to Cart");
      }
      toast.success("Item Added To Cart SuccessFully");
      window.location.replace("/cart");
      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data.message || error.message);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/cart/get-cart`);
      return data?.cart;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/cart/remove-cart/${productId}`);
      if (data && data.success === false) {
        return rejectWithValue(
          data?.message || "Error in Removing Item from Cart"
        );
      }
      message.success("Item Removed");
      return;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      quantity = parseInt(quantity, 10);
      const { data } = await API.put(`/cart/update-cart`, {
        productId,
        quantity,
      });
      toast.success("Cart Updated");
      return data?.updatedCartItem;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCartItems",
  async (_, { rejectWithValue }) => {
    try {
      await API.delete(`/cart/clear-cart`);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
      console.log("Error in clearing Cart: ", error);
    }
  }
);
