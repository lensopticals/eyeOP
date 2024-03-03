import { Address } from "../models/address.model";

// Create new Address

const createAddress = async (req, res) => {
  try {
    req.body.user = req.user._id;
    const address = await Address.create(req.body);

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

// Get the Address

const getAddress = async (req, res) => {
  try {
    const address = await Address.find({ user: req.user.id });

    if (!address || !address.length > 0) {
      return res.status(400).json({
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
    let address = await Address.findById(req.params.id);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "No address Found" });
    }
    address = await Address.findByIdAndUpdate(id, req.body, {
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
    let address = await Address.findById(req.params.id);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "No address Found" });
    }

    await Address.findByIdAndDelete(id);

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

export { createAddress, getAddress, updateAddress, deleteAddress };
