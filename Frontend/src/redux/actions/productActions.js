import API from "../../utils/API";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";
import { toast } from "react-toastify";

const [product, setProduct] = useState({});
export const getProduct = createAsyncThunk(
  "allProducts/:id",
  async ({ product_id }, { rejectWithValue }) => {
    try {
      const { data } = await API.get(
        `/allProducts/${product_id}`,
      );

      if (data && data?.success) {
        toast.success(data.message);
        setProduct(data);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// export default product;

