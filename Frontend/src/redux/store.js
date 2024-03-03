import { configureStore } from "@reduxjs/toolkit";
import { authModalReducer } from "./features/modalSlice";
import { userReducer } from "./features/userSlice";
export const store = configureStore({
  reducer: {
    authModal: authModalReducer.reducer,
    user: userReducer.reducer,
  },
});
