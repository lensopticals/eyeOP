import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { openAuthModal } from "../redux/features/modalSlice";
import { logoutUser } from "../redux/actions/userActions";

const MobileNav = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-between px-4 h-24">
        {/* Logo */}
        <div className="logo">LOGO</div>
        {/* Menu */}
        <div className="flex justify-evenly gap-10 bg-gray-600">
          <Link
            to="/profile"
            className="text-2xl border-2 border-red-700 text-gray-700"
          >
            Profile
          </Link>
          {/* <p
            onClick={() => dispatch(openAuthModal("login"))}
            className="text-white font-bold px-4 py-2 bg-purple-700"
          >
            Login/Signup
          </p> */}
        </div>
      </div>
    </>
  );
};

const FullNav = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="flex justify-between px-4 h-14">
      {/* Logo */}
      <div className="logo">LOGO</div>
      {/* Menu */}
      <div className="flex justify-end gap-10">
        <Link to="/profile" className="text-2xl text-gray-700">
          Profile
        </Link>
        {isAuthenticated ? (
          <p
            onClick={() => dispatch(logoutUser())}
            className="text-white cursor-pointer font-bold px-4 py-2 bg-purple-700"
          >
            Logout
          </p>
        ) : (
          <p
            onClick={() => dispatch(openAuthModal("login"))}
            className="text-white cursor-pointer font-bold px-4 py-2 bg-purple-700"
          >
            Login/Signup
          </p>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  return <>{window.innerWidth < 600 ? <MobileNav /> : <FullNav />}</>;
};

export default Navbar;
