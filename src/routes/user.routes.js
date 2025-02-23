import { Router } from "express";
import {
  changeCurrentPassword,
  getAllUser,
  getCurrentUser,
  googleAuth,
  loginPhoneUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerController,
  updateAccountDetails,
  verifyPhoneNumber,
  getUser,
} from "../controllers/user.controller.js";
import { authoriseRoles, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerController);
router.route("/login").post(loginUser);
router.route("/login-phone").post(loginPhoneUser);
router.route("/login-google").post(googleAuth);

// secured routes
router.route("/details").get(verifyJWT, getUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/update-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/verify-phone").post(verifyJWT, verifyPhoneNumber);
// Admin ===>
router
  .route("/admin/get-users")
  .get(verifyJWT, authoriseRoles("admin"), getAllUser);

export default router;
