import API from "../../utils/API";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// User Login with email and password
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post(
        "/user/login",
        { email, password },
        config
      );
      if (data && data?.success) {
        localStorage.setItem("token", data?.accessToken);
        toast.success(data.message);
        return data;
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

// User login with phone number

export const userLoginPhone = createAsyncThunk(
  "user/loginPhone",
  async ({ phone }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post("/user/login-phone", { phone }, config);
      if (data && data?.success) {
        localStorage.setItem("token", data?.accessToken);
        toast.success(data.message);
        return data;
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

// User Signup
export const userSignup = createAsyncThunk(
  "user/signup",
  async ({ name, email, phone }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post(
        "/user/register",
        { name, email, phone },
        config
      );
      if (data && data?.success) {
        localStorage.setItem("token", data?.accessToken);
        toast.success(data.message);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Login with Google
export const googleAuth = createAsyncThunk(
  "auth/google",
  async ({ name, email, avatar }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post(
        "/user/login-google",
        { name, email, avatar },
        config
      );
      if (data && data?.success) {
        localStorage.setItem("token", data?.accessToken);
        toast.success(data.message);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update User Profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ name, avatar, email }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };
      const { data } = await API.patch(
        "/user/update-account",
        { name, avatar, email },
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Load User
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/user/current-user");
      return data;
    } catch (error) {
      localStorage.clear();
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/user/logout");
      localStorage.clear();
      toast.success(data.message);

      return data;
    } catch (error) {
      localStorage.clear();
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
