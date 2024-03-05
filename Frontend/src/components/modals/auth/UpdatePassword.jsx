import React, { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal } from "../../../redux/features/modalSlice";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { loadUser, updatePassword } from "../../../redux/actions/userActions";
import {
  clearProfileErrors,
  updateUserReset,
} from "../../../redux/features/userSlice";
const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrPassword, setShowCurrPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector(
    (state) => state.updateProfile
  );
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.warning("Please Fill All Fields !");
      return;
    }
    if (password === confirmPassword) {
      setIsButtonDisabled(true);
      dispatch(
        updatePassword({
          oldPassword: currentPassword,
          newPassword: password,
        })
      );
    } else {
      setIsButtonDisabled(false);
      toast.error("Passwords does not match");
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProfileErrors());
    }
    if (isUpdated && !error) {
      dispatch(updateUserReset());
      dispatch(closeAuthModal());
      dispatch(loadUser());
    }
    setIsButtonDisabled(false);
  }, [error, isUpdated]);
  return (
    <div className="bg-[#ffffff00] z-50 w-screen fixed inset-0 backdrop-blur-md flex justify-center items-center">
      <div className="w-screen md:w-[30vw] h-auto flex flex-col items-center justify-center rounded-lg pt-1">
        <form className="flex relative flex-col w-full p-6 bg-white rounded-lg overflow-y-auto h-full ">
          <h3 className="mb-3 text-3xl font-semibold text-center text-gray-900">
            Update Password
          </h3>
          <p
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => dispatch(closeAuthModal())}
          >
            <LiaTimesSolid className="text-2xl" />
          </p>
          <div className="mb-4">
            {/* WE will add current password */}

            {user?.isPasswordSet && (
              <div className="relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Current Password
                </label>
                <input
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type={showCurrPassword ? "text" : "password"}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="New Password"
                />
                {/* Show Hide button */}

                <div
                  className="absolute cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors duration-100 ease-in-out p-1 rounded-full right-5 top-[43%]"
                  onClick={() => setShowCurrPassword(!showCurrPassword)}
                >
                  {showCurrPassword ? (
                    <BsEyeSlash className="text-xl" />
                  ) : (
                    <BsEye className="text-xl" />
                  )}
                </div>
              </div>
            )}

            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="New Password"
              />
              {/* Show Hide button */}

              <div
                className="absolute cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors duration-100 ease-in-out p-1 rounded-full right-5 top-[43%]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <BsEyeSlash className="text-xl" />
                ) : (
                  <BsEye className="text-xl" />
                )}
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm Password"
              />
              {/* Show Hide button */}

              <div
                className="absolute cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors duration-100 ease-in-out p-1 rounded-full right-5 top-[43%]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <BsEyeSlash className="text-xl" />
                ) : (
                  <BsEye className="text-xl" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              disabled={isButtonDisabled}
              onClick={handlePasswordUpdate}
              className="px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-800 focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-500 focus:ring-slate-100 bg-slate-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
