import React, { useEffect, useState } from "react";
import { LiaTimesSolid, LiaMailBulkSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAuthModal,
  openAuthModal,
} from "../../../redux/features/modalSlice";
import GoogleAuth from "./GoogleAuth";
import ResendOtp from "./ResendOtp";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../utils/firebase.config";
import { toast } from "react-toastify";
import { userLogin, userLoginPhone } from "../../../redux/actions/userActions";
import { clearErrors } from "../../../redux/features/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Animation from "../../../assets/animations/hi.json";
import Lottie from "lottie-react";
const Login = () => {
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const location = useLocation();
  // Logical States
  const [showOtp, setShowOtp] = useState(false);

  const [userData, setUserData] = useState(null);
  const [countryCode, setCountryCode] = useState("+91");
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  // Data States
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpTime, setOtpTime] = useState(0);

  // Onchange handlers

  const handlePhoneChange = (e) => {
    if (!isNaN(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  // Stop Background Activity
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Send Otp

  const otpHandler = async (e) => {
    e.preventDefault();
    setShowCaptcha(true);
    if (!phone || phone.length < 10) {
      toast.warning("Enter a valid phone number");
      return;
    }
    try {
      let phoneNo = countryCode + phone;
      let recaptchaVerifier;
      console.log("Phone number: " + phoneNo);
      recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });

      setShowOtp(true);

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNo,
        recaptchaVerifier
      );

      setOtpTime(30);
      toast.success("OTP Sent Successfully");
      setUserData(confirmation);
    } catch (error) {
      toast.error("Failed to send OTP");
      setShowOtp(false);
      console.log("Failed to send OTP: ", error);
    }
  };

  const phoneLoginHandler = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 6) {
      toast.warning("Otp must be at least 6 characters");
      return;
    }

    try {
      setIsButtonDisabled(true);
      const data = await userData.confirm(otp);
      toast.success("OTP verified");
      dispatch(userLoginPhone({ phone: data?.user.phoneNumber }));
    } catch (error) {
      setIsButtonDisabled(false);
      toast.error("Invalid OTP");
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
      dispatch(clearErrors());
    }
    if (isAuthenticated && !error) {
      dispatch(closeAuthModal());
    }
  }, [dispatch, error, isAuthenticated]);

  // Disable Enter key : [TODO: Will fix this later]
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <div className="bg-[#ffffff00] z-50 w-screen fixed inset-0 backdrop-blur-md flex justify-center items-center">
          <div className="w-screen md:w-[30vw] h-auto flex flex-col items-center justify-center rounded-lg pt-1">
            <form className="flex relative flex-col w-full p-6 bg-white rounded-lg overflow-y-auto h-full">
              <div className="flex justify-center items-center mb-3 text-3xl font-semibold text-center text-gray-900">
                <h1>Welcome, back </h1>
                <div className="w-14 mb-0">
                  <Lottie animationData={Animation} loop={true} />
                </div>
              </div>
              <p
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => {
                  dispatch(closeAuthModal());
                }}
              >
                <LiaTimesSolid className="text-2xl" />
              </p>
              <GoogleAuth />

              <div className="flex items-center">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">or</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>

              {/* Login With Phone No. */}

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
                    type="tel"
                    minLength={10}
                    value={phone}
                    maxLength={10}
                    onChange={handlePhoneChange}
                    placeholder="98XXXXXXXX"
                    className="flex items-center w-full pl-2 pr-5 py-4 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-r-lg rounded-br-lg"
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
                      id="phone"
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
                      className="px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-700 focus:ring-4 focus:ring-purple-100 bg-slate-600"
                    >
                      Get OTP
                    </button>
                  </div>
                )}

                {showOtp && (
                  <>
                    <button
                      disabled={otp.length < 6 || isButtonDisabled}
                      onClick={phoneLoginHandler}
                      className="disabled:cursor-not-allowed disabled:bg-slate-500 px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-700 focus:ring-4 focus:ring-slate-100 bg-slate-600"
                    >
                      Verify
                    </button>
                    <p className="text-sm text-gray-700 flex flex-wrap self-center text-center">
                      Not received OTP ?{" "}
                      {otpTime >= 1 ? (
                        <span className="text-sm px-2 text-emerald-700 font-semibold text-center">
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

              <p className="text-sm leading-relaxed mt-4 text-center text-slate-500">
                Not registered yet?{" "}
                <span
                  onClick={() => dispatch(openAuthModal("signup"))}
                  className="font-semibold text-base cursor-pointer text-emerald-700"
                >
                  Create an Account
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
      <div id="recaptcha" className="text-sm text-red-600"></div>
    </>
  );
};

export default Login;
