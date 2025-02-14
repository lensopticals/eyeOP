import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  clearCart,
  fetchCart,
  removeCart,
  updateCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.route("/create-cart").post(verifyJWT, addToCart);
router
  .route("/remove-cart/:productId/:purchaseType")
  .delete(verifyJWT, removeCart);
router.route("/update-cart").put(verifyJWT, updateCart);
router.route("/get-cart").get(verifyJWT, fetchCart);
router.route("/clear-cart").delete(verifyJWT, clearCart);

export default router;
