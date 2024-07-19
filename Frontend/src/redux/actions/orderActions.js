import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";
import { toast } from "react-toastify";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.post(`/create-order`, orderData, config);

      if (data && data?.success) {
        toast.success("Order created Successfully");
        return data; // Return response data if needed
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/order/me`);

      if (data && data?.success === false) {
        return rejectWithValue(data?.message);
      }
      return data?.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/order/${orderId}`);

      if (data && data?.success) {
        return data?.order;
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAdminOrders = createAsyncThunk(
  "order/getAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/admin/orders`);

      if (data && data?.success) {
        return data;
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/admin/order/${id}`);

      if (data && data.success === false) {
        return rejectWithValue(data?.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
