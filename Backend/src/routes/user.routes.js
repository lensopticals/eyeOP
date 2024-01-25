import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerController,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { authoriseRoles, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerController);
router.route("/login").post(loginUser);
//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/get-users").patch(authoriseRoles("admin"), updateAccountDetails);

export default router;
