import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayDate } from "../../utils/helper";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { openAuthModal } from "../../redux/features/modalSlice";
import { MdOutlineInfo } from "react-icons/md";
const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      {user && (
        <>
          <div className="mt-2 mb-10 flex flex-col p-4 w-full lg:w-[50%] border border-gray-100 mx-auto gap-6">
            <div className="relative h-40">
              <img
                src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg"
                className="w-full opacity-50 h-full object-cover"
                alt="avatar"
              />
              <h1 className="profile-text italic absolute top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2 text-center text-[2.5rem] sm:text-7xl lg:text-7xl w-full font-bold text-slate-400">
                Profile
              </h1>
              <div className="absolute top-1/2 transform left-4 -translate-y-1/2">
                <img
                  src={user?.avatar}
                  className="w-28 border-2 border-gray-300 h-28 rounded-full mx-auto"
                />
              </div>
              <div className="absolute right-5 bottom-5">
                <Link
                  to="/profile/edit"
                  className="text-white flex items-center bg-gray-800 text-center px-3 py-2"
                >
                  <CiEdit className="text-xl mr-1" />
                  Edit Profile
                </Link>
              </div>
            </div>
            <div className="flex gap-10 px-4 lg:px-8  justify-between sm:flex-row flex-col">
              {/* User Details */}
              <div className="flex flex-col gap-5">
                <div className="card-item">
                  <h4 className="font-bold text-lg text-gray-900">Name</h4>
                  <p className="text-gray-600 text-md">{user?.name}</p>
                </div>
                <div className="card-item">
                  <h4 className="font-bold text-lg text-gray-900">Email</h4>
                  <p className="text-gray-600 text-md">
                    {user?.email || "No Email Provided"}
                  </p>
                  {user?.isVerified && user?.authType === "phone" ? (
                    <p className="font-semibold  flex items-center justify-start text-green-700">
                      Verified
                      <IoIosCheckmarkCircleOutline className="text-xl ml-1" />
                    </p>
                  ) : (
                    <>
                      <p className="text-red-600 mb-2 flex items-end text-md">
                        Action Needed{" "}
                        <MdOutlineInfo className="text-red-600 ml-1 text-xl" />
                      </p>
                      <p
                        onClick={() => dispatch(openAuthModal("phone"))}
                        className="text-gray-50 cursor-pointer w-24 text-center bg-slate-700 px-4 py-1"
                      >
                        Verify
                      </p>
                    </>
                  )}
                </div>
                <div className="card-item">
                  <h4 className="font-bold text-lg text-gray-900">Phone</h4>
                  <p className="text-gray-600 mb-1 text-md">{user?.phone}</p>
                  {user?.isVerified || user?.authType === "phone" ? (
                    <p className="font-semibold  flex items-center justify-start text-green-700">
                      Verified
                      <IoIosCheckmarkCircleOutline className="text-xl ml-1" />
                    </p>
                  ) : (
                    <>
                      <p className="text-red-600 mb-2 flex items-end text-md">
                        Action Needed{" "}
                        <MdOutlineInfo className="text-red-600 text-xl" />
                      </p>
                      <p
                        onClick={() => dispatch(openAuthModal("phone"))}
                        className="text-gray-50 cursor-pointer w-24 text-center bg-slate-700 px-4 py-1"
                      >
                        Verify
                      </p>
                    </>
                  )}
                </div>
                <div className="card-item">
                  <h4 className="font-bold text-lg text-gray-900">
                    Member Since
                  </h4>
                  <p className="text-gray-600 text-md">
                    {displayDate(user?.createdAt)}
                  </p>
                </div>
              </div>
              {/* Address And password */}
              <div className="">
                {user?.isPasswordSet ? (
                  <div className="flex flex-col gap-8">
                    <div className="">
                      <p className="text-gray-700 text-lg font-semibold">
                        Want to Update Password{" "}
                      </p>
                      <p
                        onClick={() => dispatch(openAuthModal("password"))}
                        className="text-blue-800 text-md cursor-pointer underline"
                      >
                        Update password
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-lg font-semibold">
                        Change/Update Address{" "}
                      </p>
                      <p
                        onClick={() => dispatch(openAuthModal("address"))}
                        className="text-blue-800 text-md cursor-pointer underline"
                      >
                        Update address
                      </p>
                    </div>

                    {/* Update Phone No */}
                    <div>
                      <p className="text-gray-700 text-lg font-semibold">
                        Update your phone / Email
                      </p>
                      <p
                        onClick={() => dispatch(openAuthModal("phone"))}
                        className="text-blue-800 text-md cursor-pointer underline"
                      >
                        Change Phone
                      </p>
                      <p
                        onClick={() => dispatch(openAuthModal("email"))}
                        className="text-blue-800 text-md cursor-pointer underline"
                      >
                        Update Email
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-red-600 text-lg font-semibold">
                      Secure your Account !{" "}
                    </p>
                    <p
                      onClick={() => dispatch(openAuthModal("password"))}
                      className="text-blue-800 text-md cursor-pointer underline"
                    >
                      Setup password ?
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
