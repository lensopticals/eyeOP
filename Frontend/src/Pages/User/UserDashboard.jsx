import React from "react";
import { CiDeliveryTruck, CiEdit, CiUser } from "react-icons/ci";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { PiAddressBookThin } from "react-icons/pi";

const MenuItem = ({ title, detail, icon, link }) => {
  return (
    <Link
      to={link}
      className="flex w-full h-auto sm:h-40 sm:w-auto flex-row border border-slate-200 gap-16 sm:gap-2 p-4 lg:p-6 sm:flex-col hover:bg-gray-50"
    >
      <div className="img">{icon}</div>
      <div>
        <h4 className="font-semibold text-lg text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm">{detail}</p>
      </div>
    </Link>
  );
};

const UserDashboard = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="px-4 mt-2 mb-10 flex flex-col p-4 w-full lg:w-[60%] border border-gray-100 mx-auto gap-6">
      <div className="">
        <h1 className="text-4xl">Account</h1>
        <p className="text-sm text-green-600">{user?.name}</p>
        <p className="text-sm text-slate-600">{user?.email}</p>
      </div>
      <div className="relative h-40">
        <img
          src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg"
          className="w-full opacity-50 h-full object-cover"
          alt="avatar"
        />
        <h1 className="profile-text italic absolute top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2 text-center text-[1.8rem] sm:text-7xl lg:text-7xl w-full font-bold text-slate-400">
          DashBoard
        </h1>
        <div className="absolute top-1/2 transform left-4 -translate-y-1/2">
          <img
            src={user?.avatar}
            className="w-24 h-24 md:w-28 border-2 border-gray-300 md:h-28 rounded-full mx-auto"
          />
        </div>
        <div className="absolute right-5 bottom-5">
          <Link
            to="/my/profile"
            className="text-white hover:bg-slate-700 flex items-center bg-gray-800 text-center px-3 py-2"
          >
            <CiUser className="text-xl mr-1" />
            My Profile
          </Link>
        </div>
      </div>

      {/* Cards for profile menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <MenuItem
          link="/orders"
          detail={"View your Orders here"}
          title={"Orders"}
          icon={<CiDeliveryTruck className="text-4xl text-gray-600" />}
        />
        {/* <MenuItem
          link="/my/wishlist"
          title={"Collection & Wishlist"}
          detail={"All your curated items"}
          icon={<IoBagCheckOutline className="text-4xl text-gray-600" />}
        /> */}
        <MenuItem
          link="/my/addresses"
          detail={"Save Your Addresses"}
          title={"Addresses"}
          icon={<PiAddressBookThin className="text-4xl text-gray-600" />}
        />
        {/* <MenuItem
          detail={"View your Orders here"}
          title={"Orders"}
          icon={
            <MdOutlineStoreMallDirectory className="text-5xl text-gray-600" />
          }
        /> */}
        <MenuItem
          link="/my/profile"
          detail={"View and Edit your Profile"}
          title={"Profile"}
          icon={<CiUser className="text-4xl text-gray-600" />}
        />
        <MenuItem
          link="/transactions"
          detail={"View Your Transactions"}
          title={"Transactions"}
          icon={<CiUser className="text-4xl text-gray-600" />}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
