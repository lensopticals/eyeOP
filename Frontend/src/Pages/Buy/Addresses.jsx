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
          <h1 className="text-2xl max-sm:text-xl mt-7 ml-5">Select Address</h1>
          <div className="saved">
            <p className="ml-[3rem] mt-[2.5rem]">Saved Addresses</p>
            {address.map((add) => (
              <div
                className={`addressCard w-[87vw] bg-blue-100/50 p-5 mx-[2rem] mt-5 rounded-md border-2 border-slate-200 ${
                  selected === add._id ? "bg-blue-100/50" : "bg-white"
                } md:w-[50vw] mx-[3rem]`}
                key={add._id}
                onClick={() => {
                  console.log(add);
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
                      <img
                        src={correct}
                        alt="#"
                        className="w-7 block ml-auto"
                      />
                    </>
                  ) : (
                    <div className="circle ml-auto bg-white border-2 border-slate-300 w-6 h-6"></div>
                  )}
                </div>
                <div className="flex py-2">
                  <p>
                    {add.address}, {add.city}, {add.state}, {add.pincode},{" "}
                    {add.country}, {add.phone}
                  </p>
                  <div className="flex gap-3 ml-auto">
                    <p
                      onClick={() => {
                        handleDelete(add._id);
                      }}
                      className="underline cursor-pointer"
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
            className="new w-[87vw] bg-slate-50 p-5  mt-5 rounded-md border-2 border-slate-200 md:w-[50vw] mx-[3rem]"
            onClick={handleCreate}
          >
            <div className="flex">
              <p>Add new Address</p>
              <img src={plus} alt="#" className="ml-auto w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="productDetails mt-20 w-[30vw] md:ml-auto lg:ml-auto sm:ml-[4.6rem] max-sm:ml-5">
          <h1 className="lg:hidden md:hidden sm:block text-2xl mb-5 max-sm:text-lg">
            Bill Details:
          </h1>
          {id && (
            <div className="productDetails mt-20 w-[30vw] md:ml-auto lg:ml-auto sm:ml-[4.6rem] max-sm:ml-5">
              <h1 className="lg:hidden md:hidden sm:block text-2xl mb-5 max-sm:text-lg">
                Bill Details:
              </h1>
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
            </div>
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
            className="btn mb-10 mt-10 px-4 py-2 ml-5 bg-blue-700/70 rounded-md text-white max-sm:ml-2 w-[10rem] md:ml-10 lg:ml-[4rem]"
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
