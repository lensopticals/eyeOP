import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

router.route("/new-address").post(verifyJWT, createAddress);
router.route("/delete-address/:id").delete(verifyJWT, deleteAddress);
router.route("/update-address/:id").put(verifyJWT, updateAddress);
router.route("/get-address").get(verifyJWT, getAddress);

export default router;
