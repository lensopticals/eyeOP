import { Product } from "../models/product.model.js";
import { validationResult } from "express-validator";
import { ApiFeatures } from "../utils/apiFeatures.js";

// Route 1[get]: fetching all products...[Login required]  --/

const fetchallproducts = async (req, res) => {
  try {
    const resultPerpage = req.query.limit;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(
      Product.find().sort({ createdAt: -1 }),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerpage);
    const product = await apiFeature.query;

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Found" });
    }

    res.status(200).json({
      success: true,
      product,
      productCount,
      resultPerpage,
    });
  } catch (error) {
    console.log(error);
  }
};

// Route 2[get]: Getting single product....[Login required]   --/api/products/:id/
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Route 3[post]: Adding products...[Login required]  --/api/products/addproduct/
const addProduct = async (req, res) => {
  const result = await validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }
  try {
    const {
      name,
      images,
      thumbNail,
      price,
      description,
      rating,
      discountPercentage,
      stock,
      brand,
      category,
      tag,
    } = req.body;

    //creation an products object
    const product = new Product({
      name,
      images,
      thumbNail,
      price,
      description,
      rating,
      discountPercentage,
      stock,
      brand,
      category,
      tag,
    });
    const saveProduct = await product.save();

    if (!saveProduct) {
      return res
        .status(202)
        .json({ success: false, message: "product doesn't save" });
    }
    res.json({ success: true, product });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Route 4[put]: Updating the existing products...[Login required]  --/api/products/updateproduct/:id/
const updateProduct = async (req, res) => {
  try {
    let {
      name,
      images,
      thumbNail,
      price,
      description,
      rating,
      discountPercentage,
      stock,
      brand,
      category,
      tag,
    } = req.body;

    //creating a new product object
    const newProduct = {
      name,
      images,
      thumbNail,
      price,
      description,
      rating,
      discountPercentage,
      stock,
      brand,
      category,
      tag,
    };

    // Find the product to updated and update it
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product is not found!" });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json({ success: true, product });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Route 5[delete]: Deleting a product...[Login required]  --/api/products/deleteproduct/:id/
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product is not found!");
    }

    const deleteproduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteproduct) {
      return res
        .status(500)
        .json({ success: false, message: "your product is not deleted." });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// function generateOTP() {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// }

//opt generator
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const otpMap = new Map();

// router.post("/send-otp", async (req, res) => {
//   const { phoneNumber } = req.body;
//   const otp = generateOTP();

//   otpMap.set(phoneNumber, otp); // Store OTP temporarily

//   await client.verify.v2.services
//     .create({ friendlyName: "My Verify Service" })
//     .then((service) => console.log(service.sid));

//   // puts verification.sid
//   client.messages
//     .create({
//       body: `Your OTP is: ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phoneNumber,
//     })
//     .then(() => {
//       res.json({ message: "OTP sent successfully" });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: "Failed to send OTP" });
//     });
// });

export {
  fetchallproducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
