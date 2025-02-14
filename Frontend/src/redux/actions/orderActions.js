import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";
import { toast } from "react-toastify";

// Create new order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.post("/create-order", orderData, config);

      if (data?.success) {
        toast.success("Order created successfully");
        return data.order;
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

// Get user's orders
export const getOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/my-orders");

      if (data?.success) {
        return data.orders;
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// Get single order details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/order/${orderId}`);

      if (data?.success) {
        return data.order;
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);

// Cancel order
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/order/${orderId}/cancel`, { reason });

      if (data?.success) {
        toast.success("Order cancelled successfully");
        return orderId;
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  }
);

// Update payment status
export const updatePaymentStatus = createAsyncThunk(
  "order/updatePaymentStatus",
  async ({ orderId, status, paymentDetails }, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(`/order/${orderId}/update-payment`, {
        status,
        paymentDetails,
      });

      if (data?.success) {
        toast.success("Payment status updated successfully");
        return { orderId, status };
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update payment status"
      );
    }
  }
);

// Admin Actions
export const getAdminOrders = createAsyncThunk(
  "order/getAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/admin/orders");

      if (data?.success) {
        return data.orders;
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin orders"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(`/admin/order/${orderId}`, {
        orderStatus,
      });

      if (data?.success) {
        toast.success("Order status updated successfully");
        return { orderId, orderStatus };
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/admin/order/${orderId}`);

      if (data?.success) {
        toast.success("Order deleted successfully");
        return orderId;
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  }
);
