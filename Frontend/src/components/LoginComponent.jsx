import React from "react";
import { useDispatch } from "react-redux";
import { openAuthModal } from "../redux/features/modalSlice";

const LoginComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex w-screen h-[82vh] border-2 justify-center items-center">
      <div className="w-[1/3] p-7 gap-10 h-[20rem] flex flex-col justify-center items-center border border-gray-100 rounded">
        <p className="text-center text-gray-700 font-semibold">
          Please login/signup to access this page
        </p>
        <div className="text-center">
          <p
            onClick={() => dispatch(openAuthModal("login"))}
            className="text-center px-4 py-2 text-white bg-slate-700 "
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
