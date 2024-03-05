import React, { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal } from "../../../redux/features/modalSlice";
import ResendOtp from "./ResendOtp";
import { toast } from "react-toastify";
import { auth } from "../../../utils/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { LuPhone } from "react-icons/lu";
import { loadUser, verifyPhone } from "../../../redux/actions/userActions";
import {
  clearProfileErrors,
  updateUserReset,
} from "../../../redux/features/userSlice";
const UpdatePhone = () => {
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const [phone, setPhone] = useState(user?.phone);
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const handlePhoneChange = (e) => {
    if (!isNaN(e.target.value)) {
      setPhone(e.target.value);
    }
  };
  const [otpTime, setOtpTime] = useState(0);

  const otpHandler = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      toast.warning("Enter a valid phone number");
      return;
    }
    try {
      let phoneNo = countryCode + phone;
      setShowOtp(true);
      let recaptchaVerifier;
      recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNo,
        recaptchaVerifier
      );
      setOtpTime(30);
      setUserData(confirmation);
      toast.success("OTP Sent Successfully");
    } catch (error) {
      toast.error("Failed to send OTP");
      console.log("Failed to send OTP: ", error.code);
    }
  };
  // Verify OTP
  const phoneSignUPHandler = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    if (!otp || otp.length < 6) {
      return;
    }

    try {
      const data = await userData.confirm(otp);
      setIsPhoneVerified(true);
      setPhone(data.user.phoneNumber);
      toast.success("OTP verified");
      dispatch(verifyPhone({ phone }));
    } catch (error) {
      setIsPhoneVerified(false);
      setIsButtonDisabled(false);
      toast.error("Invalid Otp");
    }
  };

  // Change otp remaining time

  useEffect(() => {
    if (otpTime > 0) {
      const intervalId = setInterval(() => {
        setOtpTime(otpTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [otpTime]);

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
  }, [error, isUpdated]);

  return (
    <div className="bg-[#ffffff00] z-50 w-screen fixed inset-0 backdrop-blur-md flex justify-center items-center">
      <div className="w-screen md:w-[30vw] h-auto flex flex-col items-center justify-center rounded-lg pt-1">
        <form className="flex relative flex-col w-full p-6 bg-white rounded-lg overflow-y-auto h-full ">
          <h3 className="mb-3 text-3xl flex items-center justify-center font-semibold text-center text-gray-900">
            <LuPhone className="text-3xl mr-3" /> Update Phone
          </h3>
          <p
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => dispatch(closeAuthModal())}
          >
            <LiaTimesSolid className="text-2xl" />
          </p>
          <div className="mb-4">
            {/* Phone Authentication*/}

            <div className="flex flex-col gap-4">
              <label htmlFor="phone" className="text-sm text-gray-900">
                Phone*
              </label>
              <div className="flex">
                <input
                  required
                  disabled
                  type="tel"
                  value={countryCode}
                  className="flex items-center pl-2 w-10 py-4 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-l-lg rounded-bl-lg"
                />
                <input
                  required
                  id="phone"
                  disabled={showOtp}
                  value={phone}
                  type="tel"
                  maxLength={10}
                  onChange={handlePhoneChange}
                  placeholder="98XXXXXXXX"
                  className="flex disabled:cursor-not-allowed items-center w-full pl-2 pr-5 py-4 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-r-lg rounded-br-lg"
                />
              </div>

              {/* OTP DIV */}
              {showOtp ? (
                <div>
                  <label htmlFor="phone" className="text-sm text-gray-900">
                    Enter OTP*
                  </label>
                  <input
                    required
                    type="tel"
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="XXXXXX"
                    className="flex items-center w-full px-5 py-4 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <button
                    onClick={otpHandler}
                    className="px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-700 focus:ring-4 focus:ring-slate-100 bg-slate-600"
                  >
                    Get OTP
                  </button>
                </div>
              )}

              {showOtp && (
                <>
                  <button
                    disabled={isButtonDisabled}
                    onClick={phoneSignUPHandler}
                    className="px-10 disabled:opacity-70 disabled:cursor-not-allowed py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-700 focus:ring-4 focus:ring-slate-100 bg-slate-600"
                  >
                    Verify
                  </button>
                  <p className="text-sm text-gray-700 flex flex-wrap self-center text-center">
                    Not received OTP ?{" "}
                    {otpTime >= 1 ? (
                      <span className="text-sm px-2 text-purple-600 font-semibold text-center">
                        wait {"  "}
                        {otpTime} sec
                      </span>
                    ) : (
                      <ResendOtp phone={phone} countryCode={countryCode} />
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
          <div id="recaptcha"></div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePhone;
