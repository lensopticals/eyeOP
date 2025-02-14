import { Router } from "express";
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  updateOrder,
  updatePaymentStatus,
  cancelOrder,
} from "../controllers/order.controller.js";
import { authoriseRoles, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// User routes
router.route("/create-order").post(verifyJWT, createNewOrder);
router.route("/my-orders").get(verifyJWT, getUserOrders);
router.route("/order/:id").get(verifyJWT, getSingleOrder);
router.route("/order/:id/cancel").post(verifyJWT, cancelOrder);

// Payment routes (might need additional payment-specific middleware)
router.route("/order/:id/update-payment").patch(verifyJWT, updatePaymentStatus);

// Admin routes
router
  .route("/admin/orders")
  .get(verifyJWT, authoriseRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .patch(verifyJWT, authoriseRoles("admin"), updateOrder)
  .delete(verifyJWT, authoriseRoles("admin"), deleteOrder);

router
  .route("/admin/order/:id/payment")
  .patch(verifyJWT, authoriseRoles("admin"), updatePaymentStatus);

export default router;
