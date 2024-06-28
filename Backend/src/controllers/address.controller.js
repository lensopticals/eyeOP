import { Address1 } from "../models/address.model.js";

// Create new Address

const createAddress = async (req, res) => {
  try {
    console.log("create");
    req.body.user = req.user._id;
    const address = await Address1.create(req.body);
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Failed to create Address",
      });
    }

    res.status(201).json({
      success: true,
      message: "Address created sucessfully",
      address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create address",
    });
  }
};


// Get all Addresses of the logged in user
const getAddress = async (req, res) => {
  try {
    let address = await Address1.find({ user: req.user._id });
    if (!address || !address.length > 0) {
      return res.json({
        success: false,
        message: "No Addresses found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address Fetched sucessfully",
      address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch address",
    });
  }
};

// Get the particular Address of the given id
const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    let address = await Address1.findById(id);
    if (!address) {
      return res.json({
        success: false,
        message: "No Addresses found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address Fetched sucessfully",
      address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch address",
    });
  }
};

// Update an Address

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    let address = await Address1.findById(req.params.id);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "No address Found" });
    }
    address = await Address1.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Address updated sucessfully",
      address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating message",
    });
  }
};

// Delete an Address

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    let address = await Address1.findById(req.params.id);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "No address Found" });
    }

    await Address1.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete address" });
  }
};

export {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  getAddressById,
};
