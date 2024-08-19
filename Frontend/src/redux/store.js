import { configureStore } from "@reduxjs/toolkit";
import { authModalReducer } from "./features/modalSlice";
import { updateProfileReducer, userReducer } from "./features/userSlice";
import productReducer, { productDetailReducer } from "./features/productSlice";
import { cartDeleteReducer, cartReducer } from "./features/cartSlice";
import { addressDeleteReducer, addressReducer } from "./features/addressSlice";
import {
  deleteOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./features/orderSlice";
export const store = configureStore({
  reducer: {
    authModal: authModalReducer.reducer,
    user: userReducer.reducer,
    updateProfile: updateProfileReducer.reducer,
    product: productReducer.reducer,
    productDetail: productDetailReducer.reducer,
    cart: cartReducer.reducer,
    cartRemove: cartDeleteReducer.reducer,
    address: addressReducer.reducer,
    addressRemove: addressDeleteReducer.reducer,
    order: orderReducer.reducer,
    newOrder: newOrderReducer.reducer,
    delOrder: deleteOrderReducer.reducer,
    orderDetails: orderDetailsReducer.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
