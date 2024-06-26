import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";

export const getAddress = createAsyncThunk(
  "/address/get",
  async (_, { rejectWithValue }) => {
    try {
        console.log("Hello");
        const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await API.get("address/get-address", config);
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
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Content-type": "application/json" },
        Authorization: `Bearer ${token}`,
      };

      const {data} = await API.post("address/new-address", formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async ({id, formData}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Content-type": "multipart/form-data" },
        Authorization: `Bearer ${token}`,
      };

      const {data} = await API.put(`/update-address/${id}`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await API.delete(`/delete-address/${id}`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);



