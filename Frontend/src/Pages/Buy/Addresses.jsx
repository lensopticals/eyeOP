import React, { useCallback, useEffect, useState } from "react";
import {
  createAddress,
  deleteAddress,
  getAddress,
  getAddressById,
} from "../../redux/actions/addressAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productAction";
import correct from "../../assets/Images/correct.png";
import plus from "../../assets/Images/plus.png";
import home from "../../assets/Images/home.png";
import work from "../../assets/Images/bag.png";
import other from "../../assets/Images/location.png";
import { clearCart, getCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import useRazorpay from "react-razorpay-integration";
import { CiCirclePlus } from "react-icons/ci";
import { createOrder } from "../../redux/actions/orderActions";
import {
  clearNewOrderErrors,
  resetNewOrder,
} from "../../redux/features/orderSlice";
import { clearCartErrors } from "../../redux/features/cartSlice";
import SmallUnderline from "../../components/SmallUnderline";
import AddressForm from "../../components/AddressForm";
import { FaChevronDown, FaHome } from "react-icons/fa";
import { HiBuildingOffice } from "react-icons/hi2";
import CheckBox from "../../components/CheckBox";
import CheckoutSkeleton from "../../components/Skeletons/CheckoutSkeleton";

const Addresses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [address, setAddress] = useState([]);
  const [total, setTotal] = useState(0);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const { cart, cartError, cartLoading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, loading, success } = useSelector((state) => state.newOrder);
  const {
    success: addressSuccess,
    address,
    addressError,
  } = useSelector((state) => state.address);
  const { id } = useParams();
  const [selected, setSelected] = useState(address?.[0]?._id);
  const [Razorpay] = useRazorpay();

  const tax = 10;
  const shipping = 50;
  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
      dispatch(clearCartErrors());
    }
  }, [cartError]);

  const toggleCreateForm = () => {
    setIsAddressOpen(!isAddressOpen);
  };

  const calculateSubtotal = (items) => {
    const subtotal = items.reduce((accumulator, item) => {
      return accumulator + item.total;
    }, 0);

    return subtotal;
  };

  const calculateDiscount = (items) => {
    const subtotal = items.reduce((accumulator, item) => {
      return (
        accumulator +
        item.product?.price +
        (item.product?.price *
          item.product?.discountPercentage *
          item.quantity) /
          100 -
        item.product?.price
      );
    }, 0);
    return subtotal;
  };

  const handleDelete = async (id) => {
    dispatch(deleteAddress({ id: id }));
  };
  const handleEdit = async (aId) => {
    const { payload } = await dispatch(getAddressById({ id: aId }));
    localStorage.setItem("pId", id);
    navigate(`/address/edit/${aId}`);
  };

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  const handleCreateOrder = async (paymentId, address = "") => {
    const orderData = {
      totalAmount: total,
      paymentId,
      shippingInfo: selected ? selected : address,
      orderItems: cart,
    };
    dispatch(createOrder(orderData));
  };

  const handlePayment = async (address = "") => {
    if (!selected && !address) {
      toast.error("First select/create your order address!");
      return;
    }
    if (address) {
      setSelected(address);
    }
    setIsAddressOpen(false);
    const options = {
      key: import.meta.env.VITE_APP_RAZOR_API_KEY,
      amount: Math.ceil(total) * 100,
      currency: "INR",
      name: "Eye OP",
      description: "Test Transaction",
      image: "http://localhost:5173/src/assets/Images/logo.png",

      handler: (res) => {
        handleCreateOrder(res.razorpay_payment_id, address);
        toast.success("Payment successful");
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.on("payment.failed", function (response) {
      toast.error("Payment falied \n Error Code: " + response.error.code);
    });
    rzpay.open();
  };

  useEffect(() => {
    if (success && !error) {
      dispatch(clearCart());
      dispatch(resetNewOrder());
      navigate("/my/dashboard");
    }
    if (error) {
      toast.error(error);
      dispatch(clearNewOrderErrors());
    }
  }, [error, dispatch, success]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      setTotal(calculateSubtotal(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (address && address.length > 0) {
      setSelected(address[0]?._id);
    }
  }, [addressSuccess, dispatch]);

  // if (cartLoading)
  //   return (
  //     <>
  //       <CartSkeleton />;
  //     </>
  //   );

  return (
    <>
      {cartLoading ? (
        <CheckoutSkeleton />
      ) : (
        <div className="block lg:pb-12 lg:flex justify-between px-4 md:px-10 lg:px-16">
          {/* Address section */}

          <div className="w-full lg:w-3/5 lg:pr-10">
            <h1 className="text-2xl w-fit max-sm:text-xl mt-10 mb-5 font-semibold">
              Shipping Details
            </h1>

            <div className="w-full">
              {!isAddressOpen && (
                <>
                  <div className="flex w-full items-center justify-between cursor-pointer py-4 border-b-2 border-emerald-200">
                    <p className="w-fit text-slate-800 text-xl font-semibold">
                      Saved Addresses
                    </p>

                    <button
                      className="border w-fit border-slate-800 px-3 md:px-5 py-1.5 md:py-3 hover:bg-slate-700 text-slate-700 font-semibold hover:text-white flex gap-2 items-center text-xs md:text-base"
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
                          className={`addressCard p-3 bg-blue-100/50 mt-5 rounded-md border-2 border-slate-200 ${
                            selected === add._id ? "bg-blue-100/50" : "bg-white"
                          }`}
                          key={add._id}
                          onClick={() => {
                            setSelected(add._id);
                          }}
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
                            {selected === add._id ? (
                              <div className="circle bg-transparent ml-auto w-6 h-6">
                                <CheckBox isChecked={true} />
                              </div>
                            ) : (
                              <div className="circle bg-transparent ml-auto w-6 h-6">
                                <CheckBox />
                              </div>
                            )}
                          </div>
                          <div className="flex font-semibold pt-1 pr-3 text-sm md:text-[0.9rem] md:py-2 md:px-4">
                            <p className="text-slate-700 font-normal">
                              {add.address}, {add.city}, {add.state},{" "}
                              {add.pincode}, {add.country}, {add.phone}
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
                    className="border w-full mt-5 text-center border-slate-800 px-3 md:px-5 py-1.5 md:py-3 hover:bg-slate-700 text-slate-700 font-semibold hover:text-white flex gap-2 items-center text-sm md:text-lg justify-center"
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
                  <AddressForm
                    setSelected={setSelected}
                    handlePayment={handlePayment}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          {/* Products and Billing Summary */}

          <div
            className={`lg:border-l lg:pl-10 h-fit flex flex-col justify-center w-full lg:w-2/5`}
            id="cart"
          >
            <h2 className="text-3xl mt-5 mb-4 md:mb-10 md:text-4xl text-center font-semibold leading-10 text-slate-800 pt-3 relative">
              Order Items
              <SmallUnderline />
            </h2>
            <div
              className="w-full md:pt-2 md:pb-4 py-1 md:py-8 bg-white overflow-y-auto overflow-x-hidden max-h-[23rem] pr-4"
              id="scroll"
            >
              {cart && cart.length > 0 ? (
                cart.map((cartItem) => (
                  <div className="flex py-5 items-center gap-5 border-b border-gray-200">
                    <div className="w-20 md:w-24 h-[4.5rem] p-2 border">
                      <img
                        src={cartItem?.product.thumbnail}
                        alt
                        className="w-full h-full object-center object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-end justify-between">
                        <p className="text-xs font-semibold text-gray-600">
                          {cartItem.product.modelNo}
                        </p>
                        <p className="flex gap-2 items-center text-xs font-semibold text-gray-600">
                          <p
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                cartItem.product.frame.color[0]?.colorCode,
                            }}
                          ></p>{" "}
                          {cartItem.product.frame.color[0].name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 justify-between w-full">
                        <p className="text-sm font-normal text-gray-800">
                          {cartItem.product.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold md:text-base">
                          <span className="font-normal">Quantity: </span>{" "}
                          {cartItem?.quantity}
                        </p>
                        <p className="text-sm md:text-base font-semibold text-emerald-500">
                          ₹ {cartItem.total?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center w-full h-[40vh] flex justify-center items-center text-5xl font-semibold text-slate-700">
                  List is Empty !
                </h1>
              )}
            </div>

            {/* Summary */}
            {cart && cart.length > 0 && (
              <div className="w-full text-base bg-white h-full">
                <div className="flex flex-col px-4 md:px-1 py-4 md:py-10 overflow-y-auto">
                  <div>
                    <p className="text-2xl md:text-2xl font-semibold leading-9 text-gray-800">
                      Price Summary
                    </p>
                    <div className="flex items-center justify-between pt-8">
                      <p className="text-base leading-none text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        ₹{" "}
                        {cart &&
                          cart.length > 0 &&
                          (
                            calculateSubtotal(cart) + calculateDiscount(cart)
                          ).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        ₹ 0{" "}
                        <span className="text-xs text-gray-500 line-through">
                          ₹ {shipping}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Total Discount
                      </p>
                      <p className="text-base leading-none text-emerald-600">
                        - ₹
                        {cart &&
                          cart.length > 0 &&
                          calculateDiscount(cart).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Tax
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        ₹ 0{" "}
                        <span className="text-xs  text-gray-500 line-through">
                          ₹ {tax}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between pt-4">
                      <p className="text-2xl leading-normal font-semibold text-gray-800">
                        Total
                      </p>
                      <p className="text-2xl font-semibold leading-normal text-right text-emerald-500">
                        ₹ {cart && cart.length > 0 && total.toFixed(2)}
                        <span className="pl-2 text-sm text-gray-500 line-through">
                          ₹{" "}
                          {cart &&
                            cart.length > 0 &&
                            (
                              calculateSubtotal(cart) +
                              calculateDiscount(cart) +
                              tax +
                              shipping
                            )?.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <button
                      disabled={!selected}
                      onClick={handlePayment}
                      className="text-base disabled:cursor-not-allowed disabled:opacity-65 rounded leading-none w-full py-3 bg-gray-700 hover:bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                    >
                      Proceed to buy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <style>
        {` /* width */
                  #scroll::-webkit-scrollbar {
                      width: 1px;
                  }

                  /* Track */
                  #scroll::-webkit-scrollbar-track {
                      background: #f1f1f1;
                  }

                  /* Handle */
                  #scroll::-webkit-scrollbar-thumb {
                      background: rgb(133, 132, 132);
                  }
  `}
      </style>
    </>
  );
};

export default Addresses;
