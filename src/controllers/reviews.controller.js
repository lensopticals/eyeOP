import { Reviews } from "../models/reviews.model.js";
import { Product } from "../models/product.model.js";

//create a new review
export const createReview = async (req, res) => {
  try {
    const { product, title, images, rating, description } = req.body;
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const existingReview = await Reviews.findOne({
      product: product,
      user: req.user._id,
    });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }
    if (!title || !rating || !description) {
      return res.status(400).json({
        success: false,
        message: "Title,rating,description are required",
      });
    }

    const review = new Reviews({
      user: req.user._id,
      product,
      title,
      images,
      rating,
      description,
    });

    await review.save();

    return res
      .status(201)
      .json({ success: true, message: "Review created successfully", review });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create a review" });
  }
};

// get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const reviews = await Reviews.find({ product: productId });

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Reviews not found" });
    }

    return res
      .status(201)
      .json(
        { success: true, message: "Reviews fetched successfully" },
        reviews
      );
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch the reviews" });
  }
};

//get single revieww
export const getReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Reviews.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Review found successfully", review });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get the review" });
  }
};

// update review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Reviews.findOneAndUpdate(
      { _id: reviewId, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Review updated successfully", review });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update the review" });
  }
};

// delete review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Reviews.deleteOne({
      _id: reviewId,
      user: req.user._id,
    });

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
