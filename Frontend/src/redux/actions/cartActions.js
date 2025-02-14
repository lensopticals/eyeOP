import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";
import { toast } from "react-toastify";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, purchaseType = "FRAME_ONLY", lensCustomization },
    { rejectWithValue }
  ) => {
    try {
      quantity = parseInt(quantity, 10);
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const payload = {
        productId,
        quantity,
        purchaseType,
        ...(purchaseType === "FRAME_WITH_LENS" && { lensCustomization }),
      };

      const { data } = await API.post("/cart/create-cart", payload, config);

      if (!data.success) {
        return rejectWithValue(data?.message || "Error in Adding Item to Cart");
      }

      toast.success(data.message || "Item Added To Cart Successfully");
      window.location.replace("/cart");
      return data.cartItem;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/cart/get-cart");
      if (!data.success) {
        return rejectWithValue(data?.message || "Error fetching cart items");
      }
      return data.cart;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, purchaseType = "FRAME_ONLY" }, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(
        `/cart/remove-cart/${productId}/${purchaseType}`
      );

      if (!data.success) {
        return rejectWithValue(
          data?.message || "Error in Removing Item from Cart"
        );
      }

      toast.success(data.message || "Item Removed Successfully");
      return { productId, purchaseType };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { productId, quantity, purchaseType = "FRAME_ONLY", lensCustomization },
    { rejectWithValue, dispatch }
  ) => {
    try {
      quantity = parseInt(quantity, 10);

      const payload = {
        productId,
        quantity,
        purchaseType,
        ...(purchaseType === "FRAME_WITH_LENS" && { lensCustomization }),
      };

      const { data } = await API.put("/cart/update-cart", payload);

      if (!data.success) {
        return rejectWithValue(data?.message || "Error updating cart item");
      }

      dispatch(getCart());

      toast.success(data.message || "Cart Updated Successfully");
      return data.cartItem;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCartItems",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await API.delete("/cart/clear-cart");

      if (!data.success) {
        return rejectWithValue(data?.message || "Error clearing cart");
      }
      dispatch(getCart());
      toast.success(data.message || "Cart Cleared Successfully");
      return true;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);
