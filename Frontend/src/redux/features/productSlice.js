import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminProducts,
  deleteProduct,
  createProduct,
  createReview,
  getProductDetails,
  getProducts,
  updateProduct,
} from "../actions/productAction";

const initialState = {
  loading: false,
  products: [],
  productsCount: 0,
  resultPerPage: 0,
  filteredProductCount: 0,
  error: null,
  success: false,
};

const productReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
    createProductReset(state) {
      state.success = false;
    },
    updateProductReset(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.product;
      state.productsCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerpage;
      // state.filteredProductCount = action.payload.filteredProductCount;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(getAdminProducts.pending, (state) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.product;
      state.productsCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerpage;
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors, createProductReset, updateProductReset } =
  productReducer.actions;

export default productReducer;

export const productDetailReducer = createSlice({
  name: "productDetail",
  initialState: {
    loading: false,
    product: {},
    error: null,
  },
  reducers: {
    clearProductDetails: (state) => {
      state.loading = false;
      state.product = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const reviewProduct = createSlice({
  name: "createReview",
  initialState: {
    loading: false,
    isReviewed: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReview.pending, (state) => {
      state.loading = true;
      state.isReviewed = false;
    });

    builder.addCase(createReview.fulfilled, (state, action) => {
      state.loading = false;
      state.isReviewed = true;
    });

    builder.addCase(createReview.rejected, (state, action) => {
      state.loading = false;
      state.isReviewed = false;
      state.error = action.payload;
    });
  },
});
