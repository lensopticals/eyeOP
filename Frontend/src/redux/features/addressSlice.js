import { createSlice } from "@reduxjs/toolkit";
import {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  getAddressById,
} from "../actions/addressAction.js";

export const addressReducer = createSlice({
  name: "address",
  initialState: {
    addressLoading: false,
    success: false,
    address: null,
    addressError: null,
  },
  reducers: {
    clearAddressErrors(state) {
      state.addressError = null;
    },
    removeAddressReset(state) {
      state.addressLoading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.addressLoading = true;
        state.success = false;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.success = true;
        state.address = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.success = false;
        state.addressError = action.payload;
      })
      .addCase(getAddressById.pending, (state) => {
        state.addressLoading = true;
        state.success = false;
      })
      .addCase(getAddressById.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.success = true;
        state.address = action.payload;
      })
      .addCase(getAddressById.rejected, (state, action) => {
        state.addressLoading = false;
        state.success = false;
        state.addressError = action.payload;
      })
      .addCase(createAddress.pending, (state) => {
        state.addressLoading = true;
        state.success = false;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.success = true;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.success = false;
        state.addressError = action.payload;
      })
      .addCase(updateAddress.pending, (state) => {
        state.addressLoading = true;
        state.success = false;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.success = true;
        state.address = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.success = false;
        state.addressError = action.payload;
      });
  },
});



export const addressDeleteReducer = createSlice({
    name: "deleteAddress",
    initialState: {
        loading: false,
        success: false,
        addressError: null,
    },
    reducers: {
        clearAddressErrors(state) {
            state.addressError = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteAddress.pending, (state) => {
            state.loading = true;
            state.success = false;
        })
        .addCase(deleteAddress.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        })
        .addCase(deleteAddress.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.addressError = action.payload;
        });
    },
});

export const { clearAddressErrors, removeAddressReset } = addressReducer.actions;
