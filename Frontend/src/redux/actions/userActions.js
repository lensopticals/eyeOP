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

// get user details

export const getUser = createAsyncThunk(
  "user/details",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { "Content-type": "application/json" },
        Authentication: `Bearer ${token}`
      };
      const { data } = await API.get("/user/details", config);
      if (data && data?.success) {
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
  async ({ name, avatar, email, phone }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.patch(
        "/user/update-account",
        { name, avatar, email, phone },
        config
      );
      if (data?.success) {
        toast.success(data.message);
        return data.success;
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

// Verify Phone Number
export const verifyPhone = createAsyncThunk(
  "user/verifyPhone",
  async ({ phone }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post("/user/verify-phone", { phone }, config);
      if (data?.success) {
        toast.success(data.message);
        return data.success;
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

// Load User
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/user/current-user");
      return data;
    } catch (error) {
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

// Refersh accessToken

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/user/refresh-token");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update Password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post(
        "/user/update-password",
        { oldPassword, newPassword },
        config
      );
      if (data?.success) {
        toast.success(data.message);
        return data.success;
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
