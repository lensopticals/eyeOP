import React, { useEffect, useState } from "react";
import { createAddress, getAddress } from "../../redux/actions/addressAction";
import API from "../../utils/API";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productAction";
import home from "../../assets/Images/home.png";
import bag from "../../assets/Images/bag.png";
import location from "../../assets/Images/location.png";
import { getCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";

const AddressForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { addressLoading, addressError } = useSelector((state) => state.address);
  let { cart } = useSelector((state) => state.cart);
  const [crt, setCrt] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState("");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [country, setCountry] = useState("India");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [place, setPlace] = useState();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  const getProduct = async () => {
    const p = await dispatch(getProductDetails({ id: id }));
    setProduct(p.payload);
  };
  const gettingData = async () => {
    if (id) {
      getProduct();
    } else {
      let sum = 0;
      for (let i = 0; i < cart?.length; i++) {
        sum += cart[i].total;
      }
      setTotal(sum);
      const res = await dispatch(getCart());
    }
  };

  useEffect(() => {
    gettingData();
  }, [dispatch]);

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
      const bodyData = {
        name: name,
        email: email,
        address: address,
        city: city,
        state: state,
        country: country,
        pincode: zip,
        phone: phone,
        place: place,
      };
      const res = await dispatch(createAddress(bodyData));
      if (addressError) {
        toast.error("Fill all fields of the address field");
      }
      if (res.payload.success) {
        navigate("/payment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="base gap-10 lg:flex md:flex sm:block">
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
                  className="border-[1px] border-slate-400 p-1 pl-2 md:w-[45vw] sm:w-[80vw] max-sm:w-[89vw]"
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
                  className="border-[1px] border-slate-400 p-1 pl-2 md:w-[45vw] sm:w-[80vw] max-sm:w-[89vw]"
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
                className="border-[1px] border-slate-400 p-1 pl-2 md:w-[45vw] sm:w-[80vw] max-sm:w-[89vw]"
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
                className="border-[1px] border-slate-400 p-1 pl-2 pr-3 md:w-[45vw] sm:w-[80vw] max-sm:w-[89vw]"
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
                  className="border-[1px] border-slate-400 p-1 pl-2 md:w-[45vw] sm:w-[80vw] max-sm:w-[89vw]"
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
                  className="border-[1px] border-slate-400 p-1 pl-2 md:w-[45vw] sm:w-[80vw] max-sm:w-[89vw]"
                  value={city}
                  onChange={(e) => {
                    handleCity(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex gap-[1vw] mt-4 ml-3 max-sm:ml-0">
              <div className="state">
                <p>State</p>
                <input
                  type="text"
                  placeholder="State"
                  className="border-[1px] border-slate-400 p-1 pl-2 md:w-[22vw] sm:w-[39.5vw] max-sm:w-[44vw]"
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
                  className="border-[1px] border-slate-400 p-1 pl-2 md:w-[22vw] sm:w-[39.5vw] max-sm:w-[44vw]"
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
                selected == "home" ? "border-blue-500" : ""
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
                selected == "work" ? "border-blue-500" : ""
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
                selected == "other" ? "border-blue-500" : ""
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
        </div>

        <div className="productDetails mt-20 w-[30vw] md:ml-auto lg:ml-auto sm:ml-[4.6rem] max-sm:ml-5">
          <h1 className="lg:hidden md:hidden sm:block text-2xl mb-5 max-sm:text-lg">
            Bill Details:
          </h1>
          {id && (
            <>
              <div className="card p-5 w-[17rem] m-auto my-3 border-slate-200 border-2">
                <img
                  src={product.thumbnail}
                  alt="#"
                  className="w-[12rem] h-[12rem] m-auto mb-2"
                />
                <div className="flex">
                  <p>Name: </p>
                  <p className="ml-auto">{product?.name}</p>
                </div>
                <div className="flex">
                  <p>Discout: </p>
                  <p className="ml-auto">{product.discountPercentage}%</p>
                </div>
                <div className="flex">
                  <p>Price:</p>
                  <p className="ml-auto">${product.price}</p>
                </div>
              </div>
              <div className="flex border-slate-150 border-2 w-[17rem] m-auto p-2">
                <h1 className="text-xl ml-3 max-sm:text-lg">Total price: </h1>
                <p className="ml-auto text-xl max-sm:text-lg">
                  ${product.price}
                </p>
              </div>
            </>
          )}
          {!id &&
            cart?.map((product) => (
              <div
                key={product._id}
                className="card p-5 w-[17rem] m-auto my-3 border-slate-200 border-2"
              >
                <img
                  src={product?.product.thumbnail}
                  alt="#"
                  className="w-[12rem] h-[12rem] m-auto mb-2"
                />
                <div className="flex">
                  <p>Name: </p>
                  <p className="ml-auto">{product?.product.name}</p>
                </div>
                <div className="flex">
                  <p>Qty: </p>
                  <p className="ml-auto">{product.quantity}</p>
                </div>
                <div className="flex">
                  <p>Discout: </p>
                  <p className="ml-auto">
                    {product?.product.discountPercentage}%
                  </p>
                </div>
                <div className="flex">
                  <p>Price:</p>
                  <p className="ml-auto">${product?.total}</p>
                </div>
              </div>
            ))}
          {!id && (
            <>
              <div className="flex border-slate-150 border-2 w-[17rem] m-auto p-2">
                <h1 className="text-xl ml-3 max-sm:text-lg">Total price: </h1>
                <p className="ml-auto text-xl max-sm:text-lg">${total}</p>
              </div>
            </>
          )}
          <button
            className="btn mb-10 mt-10 px-4 py-2 ml-5 bg-blue-700/70 rounded-md text-white max-sm:ml-2 w-[10rem] sm:ml-2 md:ml-10 lg:ml-[4rem]"
            onClick={handleSubmit}
          >
            {addressLoading ? "loading..." : "Proceed to buy"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
