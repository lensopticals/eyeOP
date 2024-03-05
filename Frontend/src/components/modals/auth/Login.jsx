import React, { useEffect, useState } from "react";
import { LiaTimesSolid, LiaMailBulkSolid } from "react-icons/lia";
import { CiMail, CiPhone } from "react-icons/ci";
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
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  // Logical States
  const [showOtp, setShowOtp] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showPhoneLogin, setShowPhoneLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const [countryCode, setCountryCode] = useState("+91");
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  // Data States
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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

  const emailLoginHandler = (e) => {
    setIsButtonDisabled(true);
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please enter email and password");
      setIsButtonDisabled(false);
      return;
    }

    dispatch(userLogin({ email, password }));
    setEmail("");
    setPassword("");
    setIsButtonDisabled(false);
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

  return (
    <>
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <div className="bg-[#ffffff00] z-50 w-screen fixed inset-0 backdrop-blur-md flex justify-center items-center">
          <div className="w-screen md:w-[30vw] h-auto flex flex-col items-center justify-center rounded-lg pt-1">
            <form className="flex relative flex-col w-full p-6 bg-white rounded-lg overflow-y-auto h-full ">
              <h3 className="mb-3 text-3xl font-semibold text-center text-gray-900">
                Welcome, back 👋
              </h3>
              <p
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => dispatch(closeAuthModal())}
              >
                <LiaTimesSolid className="text-2xl" />
              </p>
              <GoogleAuth />

              {/* Login With Email Button*/}

              {showPhoneLogin && (
                <p
                  onClick={() => {
                    setShowEmailLogin(true);
                    setShowPhoneLogin(false);
                  }}
                  className="flex items-center justify-center w-full py-4 my-1 text-sm font-medium transition duration-300 rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200"
                >
                  <CiMail className="text-2xl mr-2" />
                  Sign in with Email
                </p>
              )}

              {showEmailLogin && (
                <p
                  onClick={() => {
                    setShowEmailLogin(false);
                    setShowPhoneLogin(true);
                  }}
                  className="flex items-center justify-center w-full py-4 my-1 text-sm font-medium transition duration-300 rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200"
                >
                  <CiPhone className="text-2xl mr-2" />
                  Sign in with Phone
                </p>
              )}
              <div className="flex items-center">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">or</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>

              {/* Login With Phone No. */}
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
              )}
              {/* Login With Email */}
              {showEmailLogin && (
                <div className="login-with-email text-left">
                  <label htmlFor="email" className="mb-2 text-sm text-gray-900">
                    Email*
                  </label>
                  <input
                    required
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mail@google.com"
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-3 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
                  />
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="mb-2 text-sm text-gray-900"
                    >
                      Password*
                    </label>
                    <input
                      required
                      maxLength={15}
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a password"
                      className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
                    />
                    <button
                      className="absolute inset-y-1/2 right-5 text-sm text-slate-600 font-bold"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword((prev) => !prev);
                      }}
                    >
                      {showPassword ? (
                        <BsEyeSlash className="text-xl" />
                      ) : (
                        <BsEye className="text-xl" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center mt-4 justify-center">
                    <a
                      href="javascript:void(0)"
                      className="mr-4 text-sm font-medium text-purple-blue-500"
                    >
                      Forget password?
                    </a>
                  </div>
                  <div className="flex items-center my-4 justify-center">
                    <button
                      onClick={emailLoginHandler}
                      disabled={isButtonDisabled}
                      className="px-10 py-3 disabled:cursor-not-allowed disabled:bg-slate-500 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-700 focus:ring-4 focus:ring-slate-200 bg-slate-600"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}

              <p className="text-sm leading-relaxed text-center text-slate-500">
                Not registered yet?{" "}
                <p
                  onClick={() => dispatch(openAuthModal("signup"))}
                  className="font-bold cursor-pointer text-slate-800"
                >
                  Create an Account
                </p>
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
