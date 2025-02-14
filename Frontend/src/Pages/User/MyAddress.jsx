import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { HiBuildingOffice } from "react-icons/hi2";
import CheckBox from "../../components/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../redux/actions/addressAction";

const MyAddress = () => {
  const dispatch = useDispatch();
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const {
    success: addressSuccess,
    address,
    addressError,
  } = useSelector((state) => state.address);
  const toggleCreateForm = () => {
    setIsAddressOpen(!isAddressOpen);
  };
  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);
  return (
    <>
      <div className="w-[90%] md:w-3/4 mt-5 mb-20 mx-auto">
        {!isAddressOpen && (
          <>
            <div className="flex w-full items-center justify-between cursor-pointer py-4 border-b-2 border-emerald-200">
              <p className="w-fit text-slate-800 text-xl font-semibold">
                Saved Addresses
              </p>

              <button
                className="border w-fit border-slate-800 px-3 md:px-5 py-1.5 md:py-3 hover:bg-slate-500 text-slate-700 font-semibold hover:text-white flex gap-2 items-center text-xs md:text-base rounded-md"
                onClick={() => toggleCreateForm()}
              >
                Add new Address
                <CiCirclePlus className="font-bold text-xl" />
              </button>
            </div>

            <div className="saved-content transition-all duration-300 ease-in-out">
              {address &&
                address?.length > 0 &&
                address.map((add) => (
                  <div
                    className={`addressCard p-3 mt-5 rounded-md border-2 border-slate-200 bg-white"
                    }`}
                    key={add._id}
                  >
                    <div className="flex gap-2 items-center">
                      {add?.place == "work" ? (
                        <HiBuildingOffice className="text-2xl text-slate-800" />
                      ) : (
                        <FaHome className="text-2xl text-slate-800" />
                      )}

                      <h3 className="text-xl max-sm:text-lg">
                        {add.place.charAt(0).toUpperCase() +
                          add.place.slice(1).toLowerCase()}
                      </h3>
                    </div>
                    <div className="flex font-semibold pt-1 pr-3 text-sm md:text-[0.9rem] md:py-2 md:px-4">
                      <p className="text-slate-700 font-normal">
                        {add.address}, {add.city}, {add.state}, {add.pincode},{" "}
                        {add.country}, {add.phone}
                      </p>
                      <div className="flex gap-2 ml-auto">
                        <p
                          onClick={() => handleDelete(add._id)}
                          className="underline cursor-pointer px-2 hover:text-red-600"
                        >
                          Delete
                        </p>
                        <p
                          onClick={() => handleEdit(add._id)}
                          className="underline cursor-pointer"
                        >
                          Edit
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <button
              className="border w-fit rounded-md mx-auto mt-10 text-center border-slate-800 px-3 md:px-5 py-1.5 md:py-3 hover:bg-slate-500 text-slate-700 font-semibold hover:text-white flex gap-2 items-center text-sm md:text-lg justify-center"
              onClick={() => toggleCreateForm()}
            >
              Add new Address
              <CiCirclePlus className="font-bold text-xl md:text-3xl" />
            </button>
          </>
        )}
      </div>

      {isAddressOpen ? (
        <>
          <div className="w-full mt-5 flex items-center justify-between pt-5 border-t-2 border-emerald-200">
            <h4 className="text-xl w-fit text-slate-800 font-semibold">
              Add Address
            </h4>
            <button
              className="border border-slate-800 px-3 md:px-5 py-1.5 md:py-3 hover:bg-slate-700 text-slate-700 font-semibold hover:text-white flex gap-2 items-center text-xs md:text-base"
              onClick={() => toggleCreateForm()}
            >
              View Saved Address
            </button>
          </div>
          <div className="mt-5 transition-all duration-300 ease-in-out">
            <AddressForm />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyAddress;
