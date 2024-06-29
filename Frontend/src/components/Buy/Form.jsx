import React, { useEffect, useState } from "react";
import {
  getAddressById,
  updateAddress,
} from "../../redux/actions/addressAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productAction";
import home from "../../assets/Images/home.png";
import bag from "../../assets/Images/bag.png";
import location from "../../assets/Images/location.png";

const Form = ({ btn, operation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const address1 = useSelector((state) => state.address);
  const [name, setName] = useState(
    address1.address ? address1.address.address.name : user.name
  );
  const [email, setEmail] = useState(
    address1.address ? address1.address.address.email : user.email
  );
  const [phone, setPhone] = useState(
    address1.address ? address1.address.address.phone : user.phone
  );
  const [country, setCountry] = useState(address1?.address?.address.country);
  const [address, setAddress] = useState(address1?.address?.address.address);
  const [city, setCity] = useState(address1?.address?.address.city);
  const [state, setState] = useState(address1?.address?.address.state);
  const [zip, setZip] = useState(address1?.address?.address.pincode);
  const [selected, setSelected] = useState("");
  const [place, setPlace] = useState();
  const navigate = useNavigate();

  const handleName = (input) => {
    setName(input);
  };
  const handleEmail = (input) => {
    setEmail(input);
  };
  const handlePhone = (input) => {
    setPhone(input);
  };
  const handleCountry = (input) => {
    setCountry(input);
  };
  const handleAddress = (input) => {
    setAddress(input);
  };
  const handleCity = (input) => {
    setCity(input);
  };
  const handleState = (input) => {
    setState(input);
  };
  const handleZip = (input) => {
    setZip(input);
  };

  // submit
  const handleSubmit = async () => {
    try {
      const formData = {
        name: name,
        email: email,
        address: address,
        city: city,
        state: state,
        country: country,
        pincode: zip,
        phone: phone,
      };

      operation(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="application ml-[4rem] max-sm:ml-5">
        <h1 className="text-4xl mt-4 max-sm:text-2xl">Eye OP</h1>
        <div className="personal mt-5">
          <h2 className="text-xl max-sm:text-lg">Customer Information</h2>
          <div className="fullName flex gap-5 mt-4 ml-3 max-sm:ml-0">
            <div className="name">
              <p>Full Name</p>
              <input
                type="text"
                placeholder="full name"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[15rem] max-sm:w-[90%]"
                value={name}
                onChange={(e) => {
                  handleName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="email mt-4 ml-3 max-sm:ml-0">
            <div className="email">
              <p>Email</p>
              <input
                type="email"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[31rem] max-sm:w-[90%]"
                value={email}
                onChange={(e) => {
                  handleEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="phone mt-4 ml-3 max-sm:ml-0">
            <p>Phone Number*</p>
            <input
              type="number"
              placeholder="phone number"
              className="border-[1px] border-slate-400 p-1 pl-2 w-[31rem] max-sm:w-[90%]"
              value={phone}
              onChange={(e) => {
                handlePhone(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="shippingDetails mt-10">
          <h3 className="text-lg mt-4">Shipping Address</h3>

          <div className="country mt-4 ml-3 max-sm:ml-0">
            <p>Country</p>
            <select
              name="options"
              id="options"
              className="border-[1px] border-slate-400 p-1 pl-2 pr-3 w-[31rem] max-sm:w-[90%]"
              value={country}
              onChange={(e) => {
                handleCountry(e.target.value);
              }}
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="Pakistan">Pakistan</option>
            </select>
          </div>

          <div className="address mt-4 ml-3 max-sm:ml-0">
            <div className="address">
              <p>Street Address</p>
              <input
                type="text"
                placeholder="street address..."
                className="border-[1px] border-slate-400 p-1 pl-2 w-[31rem] max-sm:w-[90%]"
                value={address}
                onChange={(e) => {
                  handleAddress(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="city mt-4 ml-3 max-sm:ml-0">
            <div className="city">
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[31rem] max-sm:w-[90%]"
                value={city}
                onChange={(e) => {
                  handleCity(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex gap-5 mt-4 ml-3 max-sm:ml-0">
            <div className="state">
              <p>State</p>
              <input
                type="text"
                placeholder="State"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[15rem] max-sm:w-[90%]"
                value={state}
                onChange={(e) => {
                  handleState(e.target.value);
                }}
              />
            </div>
            <div className="zip">
              <p>Zip Code*</p>
              <input
                type="number"
                placeholder="zip code"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[15rem] max-sm:w-[90%]"
                value={zip}
                onChange={(e) => {
                  handleZip(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="location flex mt-4 ml-3 max-sm:ml-0">
          <div
            className={`flex home px-3 text-[0.9rem] py-1 m-2 border-2 border-slate-300 rounded-2xl ${
              selected == "home" ? "border-blue-400" : ""
            }  hover:cursor-pointer`}
            onClick={() => {
              setPlace("home");
              setSelected("home");
            }}
          >
            <img
              src={home}
              className="w-[13px] h-[13px] mt-[5px] mr-1"
              alt="#"
            />
            <p>Home</p>
          </div>
          <div
            className={`flex work px-3 text-[0.9rem] py-1 m-2 border-2 border-slate-300 rounded-2xl ${
              selected == "work" ? "border-blue-400" : ""
            } hover:cursor-pointer`}
            onClick={() => {
              setPlace("work");
              setSelected("work");
            }}
          >
            <img
              src={bag}
              className="w-[13px] h-[13px] mt-[5px] mr-1"
              alt="#"
            />
            <p>Work</p>
          </div>
          <div
            className={`flex other px-3 text-[0.9rem] py-1 m-2 border-2 border-slate-300 rounded-2xl ${
              selected == "other" ? "border-blue-400" : ""
            } hover:cursor-pointer`}
            onClick={() => {
              setPlace("other");
              setSelected("other");
            }}
          >
            <img
              src={location}
              className="w-[13px] h-[13px] mt-[5px] mr-[1px]"
              alt="#"
            />
            <p>other</p>
          </div>
        </div>
        {address1.address && (
          <button
            className="btn mb-10 mt-10 px-4 py-2 ml-5 bg-blue-700/70 rounded-md text-white max-sm:ml-0 max-sm:px-3 max-sm:py-1 sm:ml-2 sm:py-1 sm:px-3"
            onClick={handleSubmit}
          >
            {btn}
          </button>
        )}
      </div>
    </>
  );
};

export default Form;
