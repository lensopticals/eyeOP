import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openAuthModal } from "../redux/features/modalSlice";
import Animation from "../assets/animations/Animation3.json";
import Lottie from "lottie-react";
const LoginComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openAuthModal("login"));
  }, []);
  return (
    <div className="flex w-screen h-[82vh] justify-center items-center">
      <div className="w-[1/3] p-7 gap-0 h-[20rem] flex flex-col justify-center items-center rounded">
        <div className="w-48 mb-0">
          <Lottie animationData={Animation} loop={true} />
        </div>
        <p className="text-center max-w-lg text-gray-500 font-semibold">
          {/* Oops! You need to log in or sign up to unlock all the shopping
          goodies. */}
          Whoops! You'll need to log in or sign up to continue your shopping
          spree. We’ve saved the best for our members!
        </p>
        <div className="text-center mt-5">
          <p
            onClick={() => dispatch(openAuthModal("login"))}
            className="text-center px-4 py-2 rounded text-white bg-slate-700 "
          >
            Login/ Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
