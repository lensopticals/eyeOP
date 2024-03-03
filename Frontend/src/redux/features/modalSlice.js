import { createSlice } from "@reduxjs/toolkit";

export const authModalReducer = createSlice({
  name: "auth",
  initialState: {
    isOpen: false,
    type: "login",
  },
  reducers: {
    openAuthModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAuthModal, closeAuthModal } = authModalReducer.actions;
