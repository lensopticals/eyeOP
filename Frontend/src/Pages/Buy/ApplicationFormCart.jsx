import React, { useEffect, useState } from "react";
import { createAddress, getAddress } from "../../redux/actions/addressAction";
import API from "../../utils/API";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productAction";

const ApplicationFormCart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const nameParts = user.name?.split(" ");
  // var fname = "";
  // for (let i=0; i<nameParts?.length-1; i++) {
  //   fname += nameParts[i];
  // }
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [country, setCountry] = useState("India");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(nameParts);
    if (
      typeof nameParts !== "undefined" &&
      nameParts !== null &&
      nameParts?.length > 0
    ) {
      setFirstName(nameParts[0]);
      setLastName(nameParts[nameParts?.length - 1]);
    }
    console.log(cart);
    let sum = 0;
    for (let i = 0; i < cart?.length; i++) {
      sum += cart[i].total;
    }
    setTotal(sum);
  }, [dispatch]);

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
          Authorization: `Bearer ${token}`,
        },
      };

      // const {data} = await API.get("/address/get-address", config);
      let fullName = firstName + " " + lastName;
      const bodyData = {
        name: fullName,
        email: email,
        address: address,
        city: city,
        state: state,
        country: country,
        pincode: zip,
        phone: phone,
      };
      // const {data} = await API.post("/address/new-address", bodyData,config);
      const res = await dispatch(createAddress(bodyData));
      if (res.payload.success) {
        navigate("/payment");
      }
      console.log(res.payload.address);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex gap-10">
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
          <button
            className="btn mb-10 mt-10 px-4 py-2 bg-blue-700 rounded-md text-white"
            onClick={handleSubmit}
          >
            Proceed to buy
          </button>
        </div>

        <div className="productDetails ml-auto w-[30vw]">
          {cart?.map((item) => (
            <>
              <div className="card p-5 w-[18rem] m-auto my-3 border-slate-200 border-2">
                <img
                  src={item.product.thumbnail}
                  alt="#"
                  className="w-[13rem] h-[12rem] m-auto mb-2"
                />
                <div className="flex">
                  <p>Name: </p>
                  <p className="ml-auto">{item.product.name}</p>
                </div>
                <div className="flex">
                  <p>Qty: </p>
                  <p className="ml-auto">{item.quantity}</p>
                </div>
                <div className="flex">
                  <p>Discout: </p>
                  <p className="ml-auto">{item.product.discountPercentage}%</p>
                </div>
                <div className="flex">
                  <p>Price:</p>
                  <p className="ml-auto">${item.total}</p>
                </div>
              </div>
            </>
          ))}
          <div className="flex border-slate-150 border-2 w-[18rem] m-auto p-2">
            <h1 className="text-xl ml-3">Total price: </h1>
            <p className="ml-auto text-xl">${total}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationFormCart;
