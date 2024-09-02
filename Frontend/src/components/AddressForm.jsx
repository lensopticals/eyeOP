import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAddressErrors,
  removeAddressReset,
} from "../redux/features/addressSlice";
import { createAddress, getAddress } from "../redux/actions/addressAction";

export default function AddressForm({ handlePayment, setSelected }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { addressLoading, addressError, createSuccess, address } = useSelector(
    (state) => state.address
  );
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    pincode: "",
    address: "",
    city: "",
    state: "",
    country: "India", // Default country
    place: "home", // Default place
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation for fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This value is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Submit form data
      dispatch(createAddress(formData));
    }
  };

  useEffect(() => {
    if (addressError) {
      toast.error(addressError);
      dispatch(clearAddressErrors());
    }
    if (createSuccess && !addressError) {
      //   toast.success("Address added successfully");
      setSelected(address?._id);
      handlePayment(address?._id);
      dispatch(removeAddressReset());
      dispatch(getAddress());
    }
  }, [dispatch, createSuccess, addressError]);

  const inputClass =
    "border border-gray-300 focus:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 rounded px-3 py-2 w-full";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <div className="p-0">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alternate Phone Number (optional)
            </label>
            <input
              type="number"
              // P              value={formData.phone}
              //               onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 !mt-12">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.city && <p className={errorClass}>{errors.city}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State/County
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.state && <p className={errorClass}>{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode/ZIP code
            </label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.pincode && <p className={errorClass}>{errors.pincode}</p>}
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.country && <p className={errorClass}>{errors.country}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address (Flat, House No., Street)
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.address && <p className={errorClass}>{errors.address}</p>}
          </div>
        </div>

        <div className="!mb-6 grid grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Place
            </label>
            <select
              name="place"
              value={formData.place}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
            {errors.place && <p className={errorClass}>{errors.place}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-700 text-white py-3 px-4 rounded hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          Save Address & Proceed
        </button>
      </form>
    </div>
  );
}
