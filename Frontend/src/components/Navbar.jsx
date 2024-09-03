import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { openAuthModal } from "../redux/features/modalSlice";
import { logoutUser } from "../redux/actions/userActions";
import profileImg from "../assets/Images/avatar.svg";
import { TfiAngleDown } from "react-icons/tfi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import Logo from "../assets/Images/logo.png";
import DummySearch from "./DummySearch";

const MainHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="flex w-full bg-white justify-between items-center md:px-12 px-4 h-16">
      {/* Logo */}
      <Link to="/" className="w-full">
        <img src={Logo} className="w-1/2 md:w-1/3" alt="" />
      </Link>

      {/* Search Bar */}
      {/* <div className="w-full  hidden sm:flex bg-gray-100 rounded items-center justify-between border border-gray-300  ">
        <CiSearch className="text-xl mx-2 text-slate-600" />
        <input
          type="text"
          placeholder="What are you looking for?"
          className="bg-gray-100 w-full outline-none focus:bg-gray-50 p-2 text-sm"
        />
      </div> */}
      <DummySearch />
      {/* Menu */}
      <div className="flex  justify-end w-full gap-3 md:gap-5 items-center">
        <div className="sm:hidden text-2xl font-bold">
          <CiSearch />
        </div>
        <NavLink to="/cart">
          <HiOutlineShoppingBag className="text-xl font-bold" />
        </NavLink>
        <NavLink to="/wishlist">
          <IoMdHeartEmpty className="text-xl font-bold" />
        </NavLink>

        {isAuthenticated ? (
          <div className="relative hidden sm:flex items-center">
            <p className="text-sm">{user ? user?.name?.split(" ")[0] : ""}</p>
            <div
              onClick={() => setDropdown(!dropdown)}
              className="flex gap-1 items-center justify-center max-w-56 min-w-20"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <img
                className="rounded-full border border-gray-500 w-10 h-10"
                src={user ? user.avatar : profileImg}
                alt=""
              />
              <TfiAngleDown className="text-sm" />
            </div>
          </div>
        ) : (
          <>
            <p
              onClick={() => dispatch(openAuthModal("login"))}
              className="text-gray-600 cursor-pointer hidden md:block font-medium"
            >
              Login
            </p>

            <p
              onClick={() => dispatch(openAuthModal("signup"))}
              className="text-white w-32 text-center cursor-pointer hidden md:block font-medium px-4 py-2 bg-gray-700"
            >
              New User +
            </p>
          </>
        )}
        {/* Drop down */}
        {dropdown && (
          <div
            className="absolute right-0 top-12 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="" role="none">
              <NavLink
                to="/my/dashboard"
                className={({ isActive }) =>
                  `text-gray-700 ${
                    isActive && "bg-gray-100"
                  } cursor-pointer block hover:bg-gray-100 px-4 py-3 text-sm`
                }
                onClick={() => setDropdown(false)}
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                My Account
                <p className="text-green-900 text-[0.67rem]">{user?.name}</p>
              </NavLink>

              <p
                onClick={() => {
                  dispatch(logoutUser());
                  setDropdown(false);
                }}
                className="text-gray-700 block cursor-pointer hover:bg-gray-100 w-full px-4 py-3 text-left text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
              >
                Sign out
              </p>
            </div>
          </div>
        )}

        <div
          id="bars"
          className="cursor-pointer md:hidden px-2 text-2xl"
          onClick={() => setOpen(true)}
        >
          &#9776;
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const customClass = ({ isActive }) =>
    `text-[1.1rem]  duration-200 ${
      isActive ? "font-semibold text-emerald-600" : "text-gray-500"
    } border-b inline-block border-gray-100 hover:bg-gray-100 backdrop-blur-sm whitespace-nowrap hover:text-emerald-600  lg:p-0`;

  document.onclick = (e) => {
    if (e.target.id !== "sidebar" && e.target.id !== "bars") {
      setOpen(false);
    }
  };

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <div className=" bg-gray-100 sticky top-0 z-50">
      {/* Main(Common) Header */}
      <MainHeader setOpen={setOpen} />
      {/* Menu Header */}

      <div className="w-full md:py-0 bg-light border px-14">
        <header
          className={`fixed top-0 ${
            open ? "right-0" : "  right-[-100%]"
          } md:static  w-full h-screen md:h-full 
          md:bg-transparent backdrop-blur-sm md:gap-0 flex flex-col md:flex-row transition-all duration-300 ease-in-out items-end md:justify-evenly md:items-center overflow-y-auto`}
        >
          <nav
            id="sidebar"
            className="flex w-[16rem] gap-5 pt-4 md:w-full h-full bg-white md:bg-transparent border-l-2 border-gray-100 md:border-0 px-5 md:p-2 md:gap-9 py-2 flex-col md:flex-row relative"
          >
            <p
              className="text-2xl text-gray-900 rounded absolute md:hidden right-4 top-4"
              onClick={() => setOpen(false)}
            >
              <LiaTimesSolid />
            </p>
            <div className="md:hidden">
              {user ? (
                <div>
                  <p>
                    Welcome,{" "}
                    <span className="text-md  font-extrabold text-slate-800">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    onClick={() => {
                      dispatch(openAuthModal("login"));
                      setOpen(false);
                    }}
                    className="text-center active:bg-slate-800 cursor-pointer w-fit px-3 py-2 bg-slate-700 text-white font-medium"
                  >
                    Login / Signup
                  </p>
                </div>
              )}
            </div>
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={customClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop/products"
              onClick={() => setOpen(false)}
              className={customClass}
            >
              Shop
            </NavLink>
            <NavLink
              to="/brands"
              onClick={() => setOpen(false)}
              className={customClass}
            >
              Brands
            </NavLink>
            <NavLink
              to="/shop/eyeglasses"
              onClick={() => setOpen(false)}
              className={customClass}
            >
              Eyeglasses
            </NavLink>
            <NavLink
              to="/shop/computer-glasses"
              onClick={() => setOpen(false)}
              className={customClass}
            >
              Computer Glasses
            </NavLink>
            <NavLink
              to="shop/sunglasses"
              onClick={() => setOpen(false)}
              className={customClass}
            >
              Sunglasses
            </NavLink>
            <NavLink
              to="/shop/products?gender=Kids"
              onClick={() => setOpen(false)}
              className={customClass}
            >
              Kids Glasses
            </NavLink>
            <NavLink
              to="/shop/contact-lenses"
              onClick={() => setOpen(false)}
              className={customClass}
            >
              Contact Lenses
            </NavLink>

            <NavLink
              to="/stores"
              onClick={() => setOpen(false)}
              className={customClass}
            >
              Our Stores
            </NavLink>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
