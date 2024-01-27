const Product = require("../models/product.model");
const express = require("express");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const { asyncHandler } = require("../utils/asyncHandler");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Route 1[get]: fetching all products...[Login required]  --/api/products/fetchallproducts/

const fetchallproducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route 2[get]: Getting single product....[Login required]   --/api/products/:id/
const getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route 3[post]: Adding products...[Login required]  --/api/products/addproduct/
const addProduct = asyncHandler(async (req, res) => {
  const result = await validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }
  try {
    const products = await Product.find();
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

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return res.status(202).send("Product already exists!");
      }
    }

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
      return res.status(202).send("product doesn't save");
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route 4[put]: Updating the existing products...[Login required]  --/api/products/updateproduct/:id/
const updateProduct = asyncHandler(async (req, res) => {
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
      id,
      title,
      images,
      price,
      description,
      rating,
      discountPercentage,
      brand,
      category,
      stock,
      tag,
    };

    // Find the product to updated and update it
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product is not found!");
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Route 5[delete]: Deleting a product...[Login required]  --/api/products/deleteproduct/:id/
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product is not found!");
    }

    const deleteproduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteproduct) {
      return res.status(500).send("your product is not deleted.");
    }
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});


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

// Route 6[get]  --Category wise products    ----/api/products/category/:cat/
const productsByCategory = asyncHandler(async (req, res) => {
  try {
    let category = req.params.cat;
    const products = await Product.find({ category: category });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route 7[get]  --fetching products by tag name    ------/api/products/searchProducts/tag/:tag
const productsByTag = asyncHandler(async (req, res) => {
    try {
      // const pro = await Product.find();
      // for (let i = 0; i < pro.length; i++) {
      //   if (pro[i].rating > 4.5) {
      //     product = await Product.findByIdAndUpdate(
      //       pro[i]._id,
      //       { $set: { tag: "popular" } },
      //       { new: true }
      //     );
      //   }
      // }
      const tag = req.params.tag;
      const products = await Product.find({ tag: tag });
      res.send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  });


// Route 8[get]  --Searching product in searchBox    ------/api/products/searchProducts/:query
const productSerching = asyncHandler(async (req, res) => {
  try {
    const query = req.params.query.trim();
    const products = await Product.find();
    const searchedProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    const ans = {
      search: searchedProducts,
      query: query,
    };

    res.send(ans.search);
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = {
    fetchallproducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    productsByCategory,
    productsByTag,
    productSerching
}
