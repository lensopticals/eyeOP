import React from "react";
import { useDispatch } from "react-redux";
import { openAuthModal } from "../redux/features/modalSlice";

const LoginComponent = () => {
  const dispatch = useDispatch();
  return (
    <>
      <p className="text-center text-gray-700 font-semibold">
        Please login/signup to access this page
      </p>
      <div
        onClick={() => dispatch(openAuthModal("login"))}
        className="text-center bg-purple-700 text-gray-700"
      >
        Login
      </div>
    </>
  );
};

export default LoginComponent;
