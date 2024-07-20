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
import useRazorpay from "react-razorpay";
import { createOrder } from "../../redux/actions/orderActions";
import { clearNewOrderErrors } from "../../redux/features/orderSlice";

const Addresses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState([]);
  const [product, setProduct] = useState({});
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, loading, success } = useSelector((state) => state.newOrder);

  const { id } = useParams();
  const [Razorpay] = useRazorpay();
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

  const getProduct = async () => {
    const p = await dispatch(getProductDetails({ id: id }));
    setProduct(p.payload);
  };

  const handleDelete = async (id) => {
    const add = await dispatch(deleteAddress({ id: id }));
    console.log("Deleted: " + add);
    getAddresses();
  };
  const handleEdit = async (aId) => {
    const { payload } = await dispatch(getAddressById({ id: aId }));
    localStorage.setItem("pId", id);
    navigate(`/address/edit/${aId}`);
  };

  const getAddresses = async () => {
    const { payload } = await dispatch(getAddress());
    if (payload.success) {
      setAddress(payload.address);
    }
  };
  const handleCreate = async () => {
    if (id) {
      navigate(`/buy/${id}`);
    } else {
      navigate(`/buy`);
    }
  };

  const handleCreateOrder = async (paymentId) => {
    const orderData = {
      totalAmount: total,
      paymentId,
      shippingInfo: selected,
      orderItems: cart,
    };
    dispatch(createOrder(orderData));
  };

  const handlePayment = async () => {
    if (!selected) {
      toast.error("First select/create your order address!");
      return;
    }
    const options = {
      key: import.meta.env.VITE_APP_RAZOR_API_KEY,
      amount: Number(total) * 100,
      currency: "INR",
      name: "Eye OP",
      description: "Test Transaction",
      image: "http://localhost:5173/src/assets/Images/logo.png",

      handler: (res) => {
        console.log(res);
        handleCreateOrder(res.razorpay_payment_id);
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
    getAddresses();
  }, []);

  useEffect(() => {
    if (success && !error) {
      dispatch(clearCart());
      navigate("/my/dashboard");
    }
    if (error) {
      toast.error(error);
      dispatch(clearNewOrderErrors());
    }
  }, [error, dispatch, success]);

  if (loading)
    return (
      <div className="h-[50vh] flex justify-center items-center text-2xl font-semibold">
        Loading...
      </div>
    );

  return (
    <>
      <div className="block md:flex lg:flex">
        <div className="addressPage">
          <h1 className="text-2xl max-sm:text-xl mt-10 md:ml-[2rem] ml-5 font-semibold">
            Select Address
          </h1>
          <div className="saved">
            <p className="ml-8 md:ml-[3rem] mt-[2.5rem]">Saved Addresses</p>
            {address.map((add) => (
              <div
                className={`addressCard p-3 bg-blue-100/50 sm:p-5 sm:mx-[1rem] mt-5 rounded-md border-2 border-slate-200 ${
                  selected === add._id ? "bg-blue-100/50" : "bg-white"
                } md:w-[50vw] mx-[1rem]`}
                key={add._id}
                onClick={() => {
                  setSelected(add._id);
                }}
              >
                <div className="flex">
                  <img
                    src={eval(add.place)}
                    alt="#"
                    className="w-5 h-5 mt-[4px] mr-2"
                  />
                  <h3 className="text-xl max-sm:text-lg">{add.place}</h3>
                  {selected === add._id ? (
                    <>
                      <div className="circle bg-transparent ml-auto w-6 h-6">
                        <img
                          src={correct}
                          alt="#"
                          className="w-6 block ml-auto"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="circle ml-auto bg-white border-2 border-slate-300 w-6 h-6"></div>
                  )}
                </div>
                <div className="flex pt-1 pr-3 text-sm md:text-[0.9rem] md:py-2 md:px-4">
                  <p>
                    {add.address}, {add.city}, {add.state}, {add.pincode},{" "}
                    {add.country}, {add.phone}
                  </p>
                  <div className="flex gap-2 ml-auto">
                    <p
                      onClick={() => {
                        handleDelete(add._id);
                      }}
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

          <div
            className="new mx-5 bg-slate-50 p-5 mt-5 rounded-md border-2 border-slate-200 md:w-[50vw]"
            onClick={handleCreate}
          >
            <div className="flex">
              <p>Add new Address</p>
              <img src={plus} alt="#" className="ml-auto w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="productDetails mt-20 max-sm:ml-1 sm:ml-auto">
          <h1 className="lg:hidden md:hidden sm:block text-2xl mb-5 max-sm:text-lg font-semibold ml-5">
            Bill Details:
          </h1>
          {id && (
            <div >
              <div className="card p-3 m-5 sm:m-3 my-3 border-slate-200 border-2 sm:flex">
                <img
                  src={product.thumbnail}
                  alt="#"
                  className="w-[10rem] m-auto mb-2 object-cover h-[7rem]"
                />
                <div className="p-3 m-2">
                  <div className="flex sm:gap-3 gap-2">
                    <p className="italic">Name: </p>
                    <p className="ml-auto font-semibold">{product?.name}</p>
                  </div>
                  <div className="flex sm:gap-3 gap-2">
                    <p className="italic">Discout: </p>
                    <p className="ml-auto font-semibold">{product.discountPercentage.toFixed(2)}%</p>
                  </div>
                  <div className="flex sm:gap-3 gap-2">
                    <p className="italic">Price:</p>
                    <p className="ml-auto font-semibold">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="flex border-slate-150 border-2 p-2 m-3">
                <h1 className="text-xl ml-3 max-sm:text-lg">Total price: </h1>
                <p className="ml-auto text-xl max-sm:text-lg font-semibold pr-3">
                  ${product.price?.toFixed(2)}
                </p>
              </div>
            </div>
          )}
          {!id &&
            cart?.map((product) => (
              <div
                key={product._id}
                className="card p-3 m-5 sm:m-3 my-3 border-slate-200 border-2 sm:flex"
              >
                <img
                  src={product?.product.thumbnail}
                  alt="#"
                  className="w-[10rem] m-auto mb-2 object-cover h-[7rem]"
                />
                <div className="p-3 m-2">
                  <div className="flex sm:gap-3 gap-2">
                    <p className="italic">Name: </p>
                    <p className="ml-auto font-semibold">
                      {product?.product.name}
                    </p>
                  </div>
                  <div className="flex sm:gap-3 gap-2">
                    <p className="italic">Qty: </p>
                    <p className="ml-auto font-semibold">{product.quantity}</p>
                  </div>
                  <div className="flex sm:gap-3 gap-2">
                    <p className="italic">Discout: </p>
                    <p className="ml-auto font-semibold">
                      {product?.product.discountPercentage}%
                    </p>
                  </div>
                  <div className="flex sm:gap-3 gap-2">
                    <p className="italic">Price:</p>
                    <p className="ml-auto font-semibold">
                      ${product?.total?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {!id && (
            <>
              <div className="flex border-slate-150 border-2 p-2 m-3">
                <h1 className="text-xl ml-3 max-sm:text-lg">Total price: </h1>
                <p className="ml-auto text-xl max-sm:text-lg font-semibold pr-3">
                  ${total?.toFixed(2)}
                </p>
              </div>
            </>
          )}
          <button
            className="btn px-2 py-2 bg-slate-700/70 rounded-md text-white max-sm:ml-2 w-[10rem] sm:m-3"
            onClick={handlePayment}
          >
            Proceed to buy
          </button>
        </div>
      </div>
    </>
  );
};

export default Addresses;
