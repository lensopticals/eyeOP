import express from "express";
import { addProduct, deleteProduct, fetchallproducts, getProduct, updateProduct } from "../controllers/product.controller.js";
import { authoriseRoles, verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/getproduct/:id").get(verifyJWT, getProduct);
router.route("/fetchallproducts").get(verifyJWT, fetchallproducts);
router.route("/addproduct").post(verifyJWT, authoriseRoles("user"), addProduct);
router.route("/updateproduct/:id/").put(verifyJWT, authoriseRoles("user"), updateProduct);
router.route("/deleteproduct/:id/").delete(verifyJWT, authoriseRoles("admin"), deleteProduct);


export default router;
