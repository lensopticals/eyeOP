import express from "express";
import {
  addProduct,
  deleteProduct,
  fetchallproducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { authoriseRoles, verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create-product/:id").get(verifyJWT, getProduct);
router.route("/all-products").get(fetchallproducts);
router
  .route("/add-product")
  .post(verifyJWT, authoriseRoles("admin"), addProduct);
router
  .route("/update-product/:id")
  .put(verifyJWT, authoriseRoles("admin"), updateProduct);
router
  .route("/delete-product/:id")
  .delete(verifyJWT, authoriseRoles("admin"), deleteProduct);

export default router;
