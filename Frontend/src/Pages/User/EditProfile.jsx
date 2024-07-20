import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { loadUser, updateProfile } from "../../redux/actions/userActions";
import {
  clearProfileErrors,
  updateUserReset,
} from "../../redux/features/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowRoundBack } from "react-icons/io";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [name, setName] = useState(user?.name);
  const [countryCode, setCountryCode] = useState("+91");
  const [avatar, setAvatar] = useState(user?.avatar);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handlePhoneChange = (e) => {
    if (!isNaN(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileUploadHandle = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!name) {
      toast.warning("Please enter your name");
      return;
    }
    if (!email) {
      toast.warning("Please enter your email");
      return;
    }
    if (!phone) {
      toast.warning("Please enter your phone number");
      return;
    }
    if (!avatar) {
      toast.warning("Please upload your avatar");
      return;
    }

    dispatch(updateProfile({ name, avatar, email, phone }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProfileErrors());
    } else if (isUpdated && !error) {
      dispatch(loadUser());
      navigate("/profile");
    }
    dispatch(updateUserReset());
  }, [dispatch, error, isUpdated]);

  return (
    <>
      <div className="w-full lg:w-1/2 overflow-x-hidden py-6 mx-auto border border-gray-50 flex flex-col gap-1">
        <div className="relative h-36">
          <img
            src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg"
            className="w-full h-full object-cover"
            alt="avatar"
          />
          <h1 className="profile-text italic absolute top-1/2 right-1/3  transform -translate-y-1/2 translate-x-1/2 text-center text-[2.5rem] sm:text-7xl lg:text-7xl w-full font-bold text-gray-700">
            Edit Profile
          </h1>
          <div className="absolute top-1/2 transform left-4 -translate-y-1/2">
            <div className="relative">
              <img
                src={avatar}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full mx-auto"
              />
              <label htmlFor="image">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={fileUploadHandle}
                />
                <CiEdit className="text-3xl absolute cursor-pointer p-1 right-1 bottom-2 text-white bg-black rounded-full"></CiEdit>
              </label>
            </div>
          </div>
        </div>

        {/* User Details */}

        <div className="md:px-24  p-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm  text-gray-900">
              Name
            </label>
            <input
              required
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-3 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-900">
              Email
            </label>
            <input
              disabled={user?.authType === "google"}
              required
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@google.com"
              className="flex disabled:opacity-90 disabled:cursor-not-allowed items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-3 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
            />
          </div>
        </div>

        <div className="flex mt-8 justify-between">
          {/* Back Button */}

          <Link
            to="/profile"
            className="px-5 flex justify-center items-center gap-1 py-2 text-sm font-medium text-slate-900 bg-gray-100 border border-transparent hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            type="button"
            onClick={() => navigate("/my/profile")}
          >
            <IoIosArrowRoundBack className="text-xl " />
            Back
          </Link>
          <button
            disabled={loading}
            onClick={handleProfileUpdate}
            className="text-white disabled:cursor-not-allowed  flex self-center disabled:opacity-65 bg-gray-800 px-3 py-2"
          >
            {loading ? "Saving profile..." : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
