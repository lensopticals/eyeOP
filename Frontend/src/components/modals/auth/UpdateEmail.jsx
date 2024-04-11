import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuPhone, LuVoicemail } from "react-icons/lu";
import { LiaTimesSolid } from "react-icons/lia";
import { closeAuthModal } from "../../../redux/features/modalSlice";
import ResendOtp from "./ResendOtp";

const UpdateEmail = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [email, setEmail] = useState(user?.email);
  const [code, setCode] = useState("");
  const [showcode, setShowcode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [codeTime, setCodeTime] = useState(0);

  const confirmationCodeHandler = (e) => {
    e.preventDefault();
    setShowcode(true);
  };

  const verifyCodeHandler = (e) => {};

  useEffect(() => {
    if (codeTime > 0) {
      const intervalId = setInterval(() => {
        setCodeTime(codeTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [codeTime]);

  return (
    <div className="bg-[#ffffff00] z-50 w-screen fixed inset-0 backdrop-blur-md flex justify-center items-center">
      <div className="w-screen md:w-[30vw] h-auto flex flex-col items-center justify-center rounded-lg pt-1">
        <form className="flex relative flex-col w-full p-6 bg-white rounded-lg overflow-y-auto h-full ">
          <h3 className="mb-3 text-3xl flex items-center justify-center font-semibold text-center text-gray-900">
            <LuVoicemail className="text-3xl mr-3" /> Verify Email
          </h3>
          <p
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => dispatch(closeAuthModal())}
          >
            <LiaTimesSolid className="text-2xl" />
          </p>

          <div className="mb-4">
            <div className="mb-4">
              <div className="flex flex-col gap-4">
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
                </div>

                {/* code DIV */}
                {showcode ? (
                  <div>
                    <label htmlFor="otp" className="text-sm text-gray-900">
                      Enter code*
                    </label>
                    <input
                      id="otp"
                      required
                      type="tel"
                      maxLength={6}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="XXXXXX"
                      className="flex items-center w-full px-5 py-4 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-500 bg-gray-100 text-gray-900 rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={confirmationCodeHandler}
                      className="px-10 py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-700 focus:ring-4 focus:ring-slate-100 bg-slate-600"
                    >
                      Get Code
                    </button>
                  </div>
                )}

                {showcode && (
                  <>
                    <button
                      disabled={isButtonDisabled}
                      onClick={verifyCodeHandler}
                      className="px-10 disabled:opacity-70 disabled:cursor-not-allowed py-3 text-md font-bold leading-none text-white transition duration-300 rounded-md hover:bg-slate-700 focus:ring-4 focus:ring-slate-100 bg-slate-600"
                    >
                      Verify
                    </button>
                    <p className="text-sm text-gray-700 flex flex-wrap self-center text-center">
                      Not received code ?{" "}
                      {codeTime >= 1 && (
                        <span className="text-sm px-2 text-purple-600 font-semibold text-center">
                          wait {"  "}
                          {codeTime} sec
                        </span>
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmail;
