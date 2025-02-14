import express from "express";
import {
  createPayment,
  updatePaymentStatus,
  getPaymentById,
  getUserPayments,
  getAllPayments,
  initiateRefund,
  deletePayment,
} from "../controllers/payment.controller.js";
import {
  verifyJWT as isAuthenticated,
  authoriseRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
// None

// Protected routes (require authentication)
router.post("/create", isAuthenticated, createPayment);
router.get("/user", isAuthenticated, getUserPayments);
router.get("/:id", isAuthenticated, getPaymentById);
router.patch("/:id/status", isAuthenticated, updatePaymentStatus);
router.post("/:id/refund", isAuthenticated, initiateRefund);

// Admin only routes
router.get(
  "/admin/all",
  isAuthenticated,
  authoriseRoles("admin"),
  getAllPayments
);
router.delete("/:id", isAuthenticated, authoriseRoles("admin"), deletePayment);

export default router;
