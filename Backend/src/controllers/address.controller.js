import {Address1} from "../models/address.model.js";

// Create new Address

const createAddress = async (req, res) => {
  try {
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

// test
const hello = (req, res) => {
  return res.json({success: true, message: "done"});
}

// Get the Address
const getAddress = async (req, res) => {
  try {
<<<<<<< HEAD
    console.log("backend");
    const address = await Address1.find({ user: req.user.id });
=======
    const address = await Address.find({ user: req.user._id });
>>>>>>> c071d589b2af83e21695ec3c30fc1850f66f53da

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

export { createAddress, getAddress, updateAddress, deleteAddress, hello };
