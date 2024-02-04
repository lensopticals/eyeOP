import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { atc, clearCart, fetchCart, removeCart, updateCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.route("/atc").put(verifyJWT, atc);
router.route("/removeCart").delete(verifyJWT, removeCart);
router.route("/updateCart").put(verifyJWT, updateCart);
router.route("/fetchCart").get(verifyJWT, fetchCart);
router.route("/clearCart").delete(verifyJWT, clearCart);

export default router;
