import { createSlice } from "@reduxjs/toolkit";
import {
  googleAuth,
  loadUser,
  logoutUser,
  userLogin,
  userLoginPhone,
  userSignup,
} from "../actions/userActions";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,

    isAuthenticated: false,
    message: "",
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginPhone.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(userLoginPhone.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.message = action.payload.message;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(
        (action) =>
          [
            userSignup.rejected.type,
            userLogin.rejected.type,
            googleAuth.rejected.type,
            loadUser.rejected.type,
            userLoginPhone.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.isAuthenticated = false;
          state.token = null;
          state.user = null;
        }
      );
  },
});

export const { clearErrors } = userReducer.actions;
