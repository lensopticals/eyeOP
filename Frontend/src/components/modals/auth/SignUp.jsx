import React, { useEffect, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAuthModal,
  openAuthModal,
} from "../../../redux/features/modalSlice";
import GoogleAuth from "./GoogleAuth";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../utils/firebase.config";
import ResendOtp from "./ResendOtp";
import { userSignup } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../../redux/features/userSlice";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import Animation from "../../../assets/animations/hi.json";

const SignUp = () => {
  const { loading, user, token, error } = useSelector((state) => state.user);
  // Logical States
  const [showOtp, setShowOtp] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showPhoneLogin, setShowPhoneLogin] = useState(true);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  const [showCaptcha, setShowCaptcha] = useState(true);

  // Data States
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [otpTime, setOtpTime] = useState(0);

  const navigate = useNavigate();

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

    if (!otp || otp.length < 6) {
      return;
    }

    try {
      const data = await userData.confirm(otp);
      setIsPhoneVerified(true);
      setShowPhoneLogin(false);
      setPhone(data.user.phoneNumber);
      toast.success("OTP verified");
    } catch (error) {
      toast.error("Invalid Otp");
    }
  };
  // Finally Register the user
  const signUpHandler = (e) => {
    e.preventDefault();
    if (!name) {
      toast.warning("Please enter your name");
      return;
    }

    dispatch(userSignup({ name, email, phone }));
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
    if (token) {
      dispatch(closeAuthModal());
      navigate("/my/profile");
    }
  }, [dispatch, error, token, navigate]);

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
      <div className="bg-[#ffffff00] z-50 w-screen fixed inset-0 backdrop-blur-md flex justify-center items-center">
        <div className="w-screen md:w-[30vw] h-auto flex flex-col items-center justify-center rounded-lg pt-1">
          <form className="flex relative flex-col w-full p-6 bg-white rounded-lg overflow-y-auto h-full ">
            <div className="flex justify-center items-center mb-3 text-3xl font-semibold text-center text-gray-900">
              <h1>Get Started</h1>
              <div className="w-14 mb-0">
                <Lottie animationData={Animation} loop={true} />
              </div>
            </div>
            <p
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => dispatch(closeAuthModal())}
            >
              <LiaTimesSolid className="text-2xl" />
            </p>
            <GoogleAuth />

            {/* Login With Email Button*/}

            <div className="flex items-center">
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
              <p className="mx-4 text-grey-600">or</p>
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
            </div>

            {/* SignUp With Phone No. */}
            {showPhoneLogin && (
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
                      className="px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-800 focus:ring-4 focus:ring-slate-100 bg-slate-700"
                    >
                      Get OTP
                    </button>
                  </div>
                )}

                {showOtp && (
                  <>
                    <button
                      onClick={phoneSignUPHandler}
                      className="px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-800 focus:ring-4 focus:ring-slate-100 bg-slate-700"
                    >
                      Verify
                    </button>
                    <p className="text-sm text-gray-700 flex flex-wrap self-center text-center">
                      Not received OTP ?{" "}
                      {otpTime >= 1 ? (
                        <span className="text-sm px-2 text-slate-600 font-semibold text-center">
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
            )}
            {/* Login With Email */}
            <div className="login-with-email text-left">
              {isPhoneVerified && (
                <>
                  <label htmlFor="email" className="text-sm text-gray-900">
                    Full Name*
                  </label>
                  <input
                    required
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    className="flex items-center w-full px-5 py-4 mt-2 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-3 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
                  />
                  <label htmlFor="email" className="text-sm text-gray-900">
                    Email (optional)
                  </label>
                  <input
                    required
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mail@google.com"
                    className="flex items-center w-full px-5 py-4 mt-2 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-3 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
                  />

                  <div className="flex items-center my-4 justify-center">
                    <button
                      onClick={signUpHandler}
                      className="px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-800 focus:ring-4 focus:ring-slate-100 bg-slate-700"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </div>
            <p
              onClick={() => dispatch(openAuthModal("login"))}
              className=" text-sm leading-relaxed text-center mt-2 text-gray-600"
            >
              Already a member?{" "}
              <span className="cursor-pointer text-base text-emerald-700 font-bold">
                Login
              </span>
            </p>
          </form>
        </div>
      </div>

      <div id="recaptcha" className="text-sm text-red-600"></div>
    </>
  );
};

export default SignUp;
