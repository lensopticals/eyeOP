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
router.route("/order/new").post(verifyJWT, createNewOrder);
router.route("/get-orders").get(verifyJWT, getUserOrders);
router.route("/order/:id").get(verifyJWT, getSingleOrder);

// Admin ===>
router
  .route("/admin/order/update/:id")
  .patch(verifyJWT, authoriseRoles("admin"), updateOrder);
router.route("/admin/order/delete/:id").delete(verifyJWT, deleteOrder);

router
  .route("/admin/get-orders")
  .get(verifyJWT, authoriseRoles("admin"), getAllOrders);

export default router;
