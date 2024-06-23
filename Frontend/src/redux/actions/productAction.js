import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";

// Get Product Details
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/product/${id}`);
      // console.log(data);
      return data?.product;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Get All Products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (
    { keyword = "", currentPage = 1, price = [0, 50000], category},
    { rejectWithValue }
  ) => {
    try {
      let url = `/all-products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        url = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }

      const { data } = await API.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Get All Admin Products
export const getAdminProducts = createAsyncThunk(
  "products/getAdminProducts",
  async ({ page }, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/admin/products?page=${page}`);
      return data ?? {};
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

// Create Product (Admin)
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };

      await API.post(`/admin/add-product`, formData, config);
      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

// Update Product (Admin)

export const updateProduct = createAsyncThunk(
  "products/update",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Update ACion Called");
      let id = formData.get("id");
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };

      const body = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        category: formData.get("category"),
      };
      console.log(body);
      await API.put(`/admin/update-product/${id}`, body, config);
      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

// Delete Product (Admin)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/admin/delete-product/${id}`);

      if (data?.success === false) {
        return rejectWithValue(data?.message);
      }

      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Create Review
export const createReview = createAsyncThunk(
  "products/createReview",
  async ({ rating, reviewMessage, productId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.put(
        `/review`,
        { rating, comment: reviewMessage, productId },
        config
      );

      if (data?.success) {
        return;
      } else {
        return rejectWithValue(data?.message);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);
