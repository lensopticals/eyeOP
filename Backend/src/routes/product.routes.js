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

<<<<<<< HEAD
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
=======
router.route("/allProducts/:id").get(getProduct);
router.route("/all-products").get(fetchallproducts);
router.route("/add-product").post(verifyJWT, authoriseRoles("admin"), addProduct);
router.route("/update-product/:id").put(verifyJWT, authoriseRoles("admin"), updateProduct);
router.route("/delete-product/:id").delete(verifyJWT, authoriseRoles("admin"), deleteProduct);
>>>>>>> d60392dd4e5d420c33722d34ca41517537c7fcee

export default router;
