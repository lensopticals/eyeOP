import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";

export const getAddress = createAsyncThunk(
  "/address/get",
  async ({ rejectWithValue }) => {
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
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

export const addAddress = createAsyncThunk(
  "/address/create",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };

      const res = await API.post("address/new-address", formData, config);
      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);
