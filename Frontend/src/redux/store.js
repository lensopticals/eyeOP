import { configureStore } from "@reduxjs/toolkit";
import { authModalReducer } from "./features/modalSlice";
import { updateProfileReducer, userReducer } from "./features/userSlice";
import productReducer, { productDetailReducer } from "./features/productSlice";
import { cartDeleteReducer, cartReducer } from "./features/cartSlice";
export const store = configureStore({
  reducer: {
    authModal: authModalReducer.reducer,
    user: userReducer.reducer,
    updateProfile: updateProfileReducer.reducer,
    product: productReducer.reducer,
    productDetail: productDetailReducer.reducer,
    cart: cartReducer.reducer,
    cartRemove: cartDeleteReducer.reducer,
  },
});
