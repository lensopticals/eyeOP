import React, { useState } from "react";
import { getAddress } from "../../redux/actions/addressAction";
import API from "../../utils/API";
import axios from "axios";

const ApplicationForm = () => {
  const [firstName, setFirstName] = useState("rana");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("rana18");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleFirst = (input) => {
    setFirstName(input);
  };
  const handleLast = (input) => {
    setLastName(input);
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
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-type": "application/json",
          'authorization': `Bearer ${token}`,
        },
      };

      const res = await API("/address/a");
      console.log(res);
      // return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="application ml-[4rem]">
        <h1 className="text-4xl mt-4">Eye OP</h1>
        <div className="personal mt-5">
          <h2 className="text-xl">Customer Information</h2>
          <div className="fullName flex gap-5 mt-4 ml-3">
            <div className="first">
              <p>First Name</p>
              <input
                type="text"
                placeholder="first name"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[15rem]"
                value={firstName}
                onChange={(e) => {
                  handleFirst(e.target.value);
                }}
              />
            </div>
            <div className="last">
              <p>Last Name</p>
              <input
                type="text"
                placeholder="last name"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[15rem]"
                value={lastName}
                onChange={(e) => {
                  handleLast(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="email mt-4 ml-3">
            <div className="email">
              <p>Email</p>
              <input
                type="email"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[31rem]"
                value={email}
                onChange={(e) => {
                  handleEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="phone mt-4 ml-3">
            <p>Phone Number*</p>
            <input
              type="number"
              placeholder="phone number"
              className="border-[1px] border-slate-400 p-1 pl-2 w-[31rem]"
              value={phone}
              onChange={(e) => {
                handlePhone(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="shippingDetails mt-10">
          <h3 className="text-xl">Shipping Information</h3>
          <h3 className="text-lg mt-4">Shipping Address</h3>

          <div className="country mt-4 ml-3">
            <p>Country</p>
            <select
              name="options"
              id="options"
              className="border-[1px] border-slate-400 p-1 pl-2 pr-3 w-[31rem]"
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

          <div className="address mt-4 ml-3">
            <div className="address">
              <p>Street Address</p>
              <input
                type="text"
                placeholder="street address..."
                className="border-[1px] border-slate-400 p-1 pl-2 w-[31rem]"
                value={address}
                onChange={(e) => {
                  handleAddress(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="city mt-4 ml-3">
            <div className="city">
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[31rem]"
                value={city}
                onChange={(e) => {
                  handleCity(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex gap-5 mt-4 ml-3">
            <div className="state">
              <p>State</p>
              <input
                type="text"
                placeholder="State"
                className="border-[1px] border-slate-400 p-1 pl-2 w-[15rem]"
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
                className="border-[1px] border-slate-400 p-1 pl-2 w-[15rem]"
                value={zip}
                onChange={(e) => {
                  handleZip(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn ml-[5rem] mt-10 px-4 py-2 bg-blue-700 rounded-md text-white"
        onClick={handleSubmit}
      >
        Proceed to buy
      </button>
    </>
  );
};

export default ApplicationForm;
