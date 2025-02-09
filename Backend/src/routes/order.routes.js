import { Router } from "express";
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  updateOrder,
} from "../controllers/order.controller.js";
import { authoriseRoles, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// secured routes
router.route("/create-order").post(verifyJWT, createNewOrder);
router.route("/get-orders").get(verifyJWT, getUserOrders);
router.route("/order/:id").get(getSingleOrder);

// Admin ===>
router
  .route("/admin/update-order/:id")
  .patch(verifyJWT, authoriseRoles("admin"), updateOrder);
router.route("/admin/delete-order/:id").delete(verifyJWT, deleteOrder);

router
  .route("/admin/get-orders")
  .get(verifyJWT, authoriseRoles("admin"), getAllOrders);

export default router;
