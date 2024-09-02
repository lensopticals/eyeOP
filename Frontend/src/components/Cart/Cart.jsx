import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeFromCart,
  updateCart,
} from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import { clearCartErrors } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import CartSkeleton from "../Skeletons/CartSkeleton";

function Cart({ className = "" }) {
  const [show, setShow] = useState(false);
  const { cart, cartLoading, cartError } = useSelector((state) => state.cart);
  const { success, loading } = useSelector((state) => state.cartRemove);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [subtotal, setSubtotal] = useState(0);
  const tax = 10;
  const shipping = 50;
  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, success]);

  useEffect(() => {
    if (cartError) {
      // toast.error(cartError);
      console.log(cartError);

      dispatch(clearCartErrors());
    }
  }, [cartError]);

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

  const handleCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/checkout/address`);
    } else {
      dispatch(openAuthModal("login"));
    }
  };

  return (
    <>
      {cartLoading ? (
        <CartSkeleton />
      ) : (
        <div>
          <div
            className="w-full h-full bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden"
            id="chec-div"
          >
            <div
              className="w-full h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
              id="checkout"
            >
              <div
                className={`flex md:flex-row flex-col justify-center ${className}`}
                id="cart"
              >
                <div
                  className="2xl:w-1/2 md:w-2/3 w-full md:pl-10 pl-4 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden max-h-screen"
                  id="scroll"
                >
                  <p className="text-5xl font-semibold leading-10 text-slate-800 pt-3">
                    Cart
                  </p>
                  {cart && cart.length > 0 ? (
                    cart.map((cartItem) => (
                      <div className="md:flex items-center justify-between mt-5 py-5 border-t border-gray-200">
                        <div className="w-1/6 h-fit md:h-28 border">
                          <img
                            src={cartItem?.product.thumbnail}
                            alt
                            className="w-full h-full object-center object-contain"
                          />
                        </div>
                        <div className="md:pl-3 md:w-3/4">
                          <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                            {cartItem.product.modelNo}
                          </p>
                          <div className="flex items-center justify-between w-full pt-1">
                            <p className="text-base font-semibold leading-none text-gray-800">
                              {cartItem.product.name}
                            </p>
                            <p className="text-sm font-semibold leading-3 text-gray-600 py-1">
                              ₹ {cartItem.product.price?.toFixed(2)}
                            </p>
                            <select
                              onChange={(e) =>
                                dispatch(
                                  updateCart({
                                    productId: cartItem.product._id,
                                    quantity: e.target.value,
                                  })
                                )
                              }
                              value={cartItem?.quantity}
                              className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                            </select>
                          </div>

                          <p className="text-sm leading-3 text-gray-600 py-1">
                            {cartItem.product.frame.color[0]?.name}
                          </p>
                          {/* <p className="w-96 text-sm leading-3 py-1 text-gray-600">
                            {cartItem.product?.description}
                          </p> */}
                          <div className="flex items-center justify-between pt-0 pr-6">
                            <div className="flex items-center gap-4">
                              {/* <p className="text-sm leading-3 underline text-gray-800 cursor-pointer">
                                Add to favorites
                              </p> */}
                              <p
                                onClick={() => {
                                  dispatch(
                                    removeFromCart({
                                      productId: cartItem.product._id,
                                    })
                                  );
                                }}
                                className="text-md leading-3 underline text-red-500  cursor-pointer"
                              >
                                Remove
                              </p>
                            </div>

                            <p className="text-base font-semibold text-gray-800">
                              ₹ {cartItem.total?.toFixed(2)}
                              <span className="text-xs ml-2  text-emerald-400 line-through">
                                ₹{" "}
                                {(
                                  cartItem.quantity * cartItem.product.price +
                                  (cartItem.product.price *
                                    cartItem.product.discountPercentage *
                                    cartItem.quantity) /
                                    100
                                )?.toFixed(2)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-center w-full h-[40vh] flex justify-center items-center text-5xl font-semibold text-slate-700">
                      Cart Is Empty !
                    </h1>
                  )}
                </div>

                {/* Summary */}
                {cart && cart.length > 0 && (
                  <div className="2xl:w-1/2 md:w-1/3  w-full bg-white h-full">
                    <div className="flex flex-col md:h-screen px-14 py-4 md:py-20 overflow-y-auto">
                      <div>
                        <p className="text-4xl font-semibold leading-9 text-gray-800">
                          Summary
                        </p>
                        <div className="flex items-center justify-between pt-16">
                          <p className="text-base leading-none text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base leading-none text-gray-800">
                            ₹{" "}
                            {cart &&
                              cart.length > 0 &&
                              (
                                calculateSubtotal(cart) +
                                calculateDiscount(cart)
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
                        <div className="flex items-center pb-6 justify-between pt-8 ">
                          <p className="text-2xl leading-normal text-gray-800">
                            Total
                          </p>
                          <p className="text-2xl font-semibold leading-normal text-right text-gray-800">
                            ₹{" "}
                            {cart &&
                              cart.length > 0 &&
                              calculateSubtotal(cart).toFixed(2)}
                            <span className="pl-2 text-xs text-emerald-500 line-through">
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
                          onClick={handleCart}
                          className="text-base leading-none w-full py-3 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
}

export default Cart;
