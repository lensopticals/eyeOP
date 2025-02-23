import express from "express";

import { authoriseRoles, verifyJWT } from "../middlewares/auth.middleware.js";
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from "../controllers/reviews.controller.js";

const router = express.Router();

router.route("/:id").get(getReview);
router.route("/all-reviews").get(getAllReviews);
router
  .route("/create-review")
  .post(verifyJWT, createReview);
router
  .route("/update-review/:id")
  .put(verifyJWT, authoriseRoles("user"), updateReview);
router
  .route("/admin/delete-review/:id")
  .delete(verifyJWT, authoriseRoles("admin"), deleteReview);

export default router;