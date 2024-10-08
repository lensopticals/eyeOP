import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";
import { toast } from "react-toastify";

export const getAddress = createAsyncThunk(
  "/address/get",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await API.get("address/get-address", config);
      return data.address;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAddressById = createAsyncThunk(
  "/address/get/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const { data } = await API.get(`address/get-address/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createAddress = createAsyncThunk(
  "/address/create",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.post("address/new-address", formData, config);
      toast.success("Address created successfully!");
      return data.address;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.put(
        `address/update-address/${id}`,
        formData,
        config
      );
      toast.success("Address updated successfully!");
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await API.delete(`address/delete-address/${id}`, config);

      dispatch(getAddress());
      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);
