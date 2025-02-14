// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getCart,
//   removeFromCart,
//   updateCart,
// } from "../../redux/actions/cartActions";
// import { toast } from "react-toastify";
// import { clearCartErrors } from "../../redux/features/cartSlice";
// import { useNavigate } from "react-router-dom";
// import CartSkeleton from "../Skeletons/CartSkeleton";

// function Cart({ className = "" }) {
//   const { cart, cartLoading, cartError } = useSelector((state) => state.cart);
//   const { success, loading } = useSelector((state) => state.cartRemove);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const tax = 10;
//   const shipping = 50;

//   useEffect(() => {
//     dispatch(getCart());
//   }, []);

//   useEffect(() => {
//     dispatch(getCart());
//   }, [dispatch, success]);

//   useEffect(() => {
//     if (cartError) {
//       console.log(cartError);
//       dispatch(clearCartErrors());
//     }
//   }, [cartError]);

//   const calculateSubtotal = (items) => {
//     return items.reduce((accumulator, item) => {
//       return accumulator + item.total;
//     }, 0);
//   };

//   const calculateDiscount = (items) => {
//     return items.reduce((accumulator, item) => {
//       const basePrice = item.product?.price;
//       const lensPrice =
//         item.purchaseType === "FRAME_WITH_LENS"
//           ? item.lensCustomization?.selectedPackage?.price || 0
//           : 0;
//       const totalPrice = (basePrice + lensPrice) * item.quantity;
//       const discount = (totalPrice * item.product?.discountPercentage) / 100;
//       return accumulator + discount;
//     }, 0);
//   };

//   const handleCart = async () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate(`/checkout/address`);
//     } else {
//       dispatch(openAuthModal("login"));
//     }
//   };

//   const renderPriceDetails = (cartItem) => {
//     const basePrice = cartItem.product.price;
//     const lensPrice =
//       cartItem.purchaseType === "FRAME_WITH_LENS"
//         ? cartItem.lensCustomization?.selectedPackage?.price || 0
//         : 0;
//     const totalBasePrice = (basePrice + lensPrice) * cartItem.quantity;
//     const discountedPrice = cartItem.total;

//     return (
//       <p className="text-base font-semibold text-gray-800">
//         ₹ {discountedPrice?.toFixed(2)}
//         <span className="text-xs ml-2 text-emerald-400 line-through">
//           ₹ {totalBasePrice?.toFixed(2)}
//         </span>
//       </p>
//     );
//   };

//   return (
//     <>
//       {cartLoading ? (
//         <CartSkeleton />
//       ) : (
//         <div>
//           <div
//             className="w-full h-full bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden"
//             id="chec-div"
//           >
//             <div
//               className="w-full h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
//               id="checkout"
//             >
//               <div
//                 className={`flex md:flex-row flex-col justify-center ${className}`}
//                 id="cart"
//               >
//                 <div
//                   className="2xl:w-1/2 md:w-2/3 w-full md:pl-10 pl-4 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden max-h-screen"
//                   id="scroll"
//                 >
//                   <p className="text-5xl font-semibold leading-10 text-slate-800 pt-3">
//                     Cart
//                   </p>
//                   {cart && cart.length > 0 ? (
//                     cart.map((cartItem) => (
//                       <div
//                         key={`${cartItem.product._id}-${cartItem.purchaseType}`}
//                         className="md:flex items-center justify-between mt-5 py-5 border-t border-gray-200"
//                       >
//                         <div className="w-1/6 h-fit md:h-28 border">
//                           <img
//                             src={cartItem?.product.thumbnail}
//                             alt={cartItem.product.name}
//                             className="w-full h-full object-center object-contain"
//                           />
//                         </div>
//                         <div className="md:pl-3 md:w-3/4">
//                           <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
//                             {cartItem.product.modelNo}
//                           </p>
//                           <div className="flex items-center justify-between w-full pt-1">
//                             <p className="text-base font-semibold leading-none text-gray-800">
//                               {cartItem.product.name}
//                               {cartItem.purchaseType === "FRAME_WITH_LENS" && (
//                                 <span className="ml-2 text-sm text-emerald-600">
//                                   (with {cartItem.lensCustomization?.lensType}{" "}
//                                   lens)
//                                 </span>
//                               )}
//                             </p>
//                             <p className="text-sm font-semibold leading-3 text-gray-600 py-1">
//                               ₹ {cartItem.product.price?.toFixed(2)}
//                               {cartItem.purchaseType === "FRAME_WITH_LENS" && (
//                                 <span className="ml-2">
//                                   + ₹{" "}
//                                   {cartItem.lensCustomization?.selectedPackage?.price?.toFixed(
//                                     2
//                                   )}
//                                 </span>
//                               )}
//                             </p>
//                             <select
//                               onChange={(e) =>
//                                 dispatch(
//                                   updateCart({
//                                     productId: cartItem.product._id,
//                                     quantity: e.target.value,
//                                     purchaseType: cartItem.purchaseType,
//                                     lensCustomization:
//                                       cartItem.lensCustomization,
//                                   })
//                                 )
//                               }
//                               value={cartItem?.quantity}
//                               className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
//                             >
//                               {[...Array(11)].map((_, i) => (
//                                 <option key={i + 1} value={i + 1}>
//                                   {i + 1}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>

//                           <p className="text-sm leading-3 text-gray-600 py-1">
//                             {cartItem.product.frame.color[0]?.name}
//                           </p>

//                           <div className="flex items-center justify-between pt-0 pr-6">
//                             <div className="flex items-center gap-4">
//                               <p
//                                 onClick={() => {
//                                   dispatch(
//                                     removeFromCart({
//                                       productId: cartItem.product._id,
//                                       purchaseType: cartItem.purchaseType,
//                                     })
//                                   );
//                                 }}
//                                 className="text-md leading-3 underline text-red-500 cursor-pointer"
//                               >
//                                 Remove
//                               </p>
//                             </div>
//                             {renderPriceDetails(cartItem)}
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <h1 className="text-center w-full h-[40vh] flex justify-center items-center text-5xl font-semibold text-slate-700">
//                       Cart Is Empty!
//                     </h1>
//                   )}
//                 </div>

//                 {cart && cart.length > 0 && (
//                   <div className="2xl:w-1/2 md:w-1/3 w-full bg-white h-full">
//                     <div className="flex flex-col md:h-screen px-14 py-4 md:py-20 overflow-y-auto">
//                       <div>
//                         <p className="text-4xl font-semibold leading-9 text-gray-800">
//                           Summary
//                         </p>
//                         <div className="flex items-center justify-between pt-16">
//                           <p className="text-base leading-none text-gray-800">
//                             Subtotal
//                           </p>
//                           <p className="text-base leading-none text-gray-800">
//                             ₹{" "}
//                             {cart &&
//                               (
//                                 calculateSubtotal(cart) +
//                                 calculateDiscount(cart)
//                               ).toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="flex items-center justify-between pt-5">
//                           <p className="text-base leading-none text-gray-800">
//                             Shipping
//                           </p>
//                           <p className="text-base leading-none text-gray-800">
//                             ₹ 0{" "}
//                             <span className="text-xs text-gray-500 line-through">
//                               ₹ {shipping}
//                             </span>
//                           </p>
//                         </div>
//                         <div className="flex items-center justify-between pt-5">
//                           <p className="text-base leading-none text-gray-800">
//                             Total Discount
//                           </p>
//                           <p className="text-base leading-none text-emerald-600">
//                             - ₹ {cart && calculateDiscount(cart).toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="flex items-center justify-between pt-5">
//                           <p className="text-base leading-none text-gray-800">
//                             Tax
//                           </p>
//                           <p className="text-base leading-none text-gray-800">
//                             ₹ 0{" "}
//                             <span className="text-xs text-gray-500 line-through">
//                               ₹ {tax}
//                             </span>
//                           </p>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex items-center pb-6 justify-between pt-8">
//                           <p className="text-2xl leading-normal text-gray-800">
//                             Total
//                           </p>
//                           <p className="text-2xl font-semibold leading-normal text-right text-gray-800">
//                             ₹ {cart && calculateSubtotal(cart).toFixed(2)}
//                             <span className="pl-2 text-xs text-emerald-500 line-through">
//                               ₹{" "}
//                               {cart &&
//                                 (
//                                   calculateSubtotal(cart) +
//                                   calculateDiscount(cart) +
//                                   tax +
//                                   shipping
//                                 ).toFixed(2)}
//                             </span>
//                           </p>
//                         </div>
//                         <button
//                           onClick={handleCart}
//                           className="text-base leading-none w-full py-3 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
//                         >
//                           Checkout
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           #scroll::-webkit-scrollbar {
//             width: 1px;
//           }
//           #scroll::-webkit-scrollbar-track {
//             background: #f1f1f1;
//           }
//           #scroll::-webkit-scrollbar-thumb {
//             background: rgb(133, 132, 132);
//           }
//         `}
//       </style>
//     </>
//   );
// }

// export default Cart;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeFromCart,
  updateCart,
} from "../../redux/actions/cartActions";
import { clearCartErrors } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import CartSkeleton from "../Skeletons/CartSkeleton";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Cart({ className = "" }) {
  const { cart, cartLoading, cartError } = useSelector((state) => state.cart);
  const { success, loading } = useSelector((state) => state.cartRemove);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tax = 10;
  const shipping = 50;

  const [expandedItems, setExpandedItems] = useState({});

  const toggleLensDetails = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, success]);

  useEffect(() => {
    if (cartError) {
      dispatch(clearCartErrors());
    }
  }, [cartError]);

  const calculateSubtotal = (items) => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  const calculateDiscount = (items) => {
    return items.reduce((acc, item) => {
      const basePrice = item.product?.price || 0;
      const lensPrice =
        item.purchaseType === "FRAME_WITH_LENS"
          ? item.lensCustomization?.selectedPackage?.price || 0
          : 0;
      const totalPrice = (basePrice + lensPrice) * item.quantity;
      const discount =
        (totalPrice * (item.product?.discountPercentage || 0)) / 100;
      return acc + discount;
    }, 0);
  };

  const handleCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/checkout/address`);
    } else {
      dispatch(openAuthModal("login"));
    }
  };

  const renderLensDetails = (cartItem) => {
    if (
      cartItem.purchaseType !== "FRAME_WITH_LENS" ||
      !cartItem.lensCustomization
    ) {
      return null;
    }

    const { lensType, selectedPackage } = cartItem.lensCustomization;
    const features = selectedPackage?.features || {};
    const itemId = `${cartItem.product._id}-${cartItem.purchaseType}`;
    const isExpanded = expandedItems[itemId];

    return (
      <div className="mt-2 text-sm">
        <div
          onClick={() => toggleLensDetails(itemId)}
          className="flex items-center justify-between cursor-pointer py-2 px-3 bg-emerald-50/50 hover:bg-emerald-50 rounded-md"
        >
          <p className="font-medium text-emerald-600 underline">
            {lensType.title} Lens - {selectedPackage.name}
          </p>
          {isExpanded ? (
            <FaChevronUp className="w-4 h-4 text-emerald-600" />
          ) : (
            <FaChevronDown className="w-4 h-4 text-emerald-600" />
          )}
        </div>

        {isExpanded && (
          <div className="mt-2 px-3 py-2 bg-gray-50 rounded-md">
            <div className="grid grid-cols-1 gap-1.5 text-gray-600">
              {features.warrantyPeriod && (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>{features.warrantyPeriod} Warranty</span>
                </div>
              )}
              {features.index && (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Index: {features.index}</span>
                </div>
              )}
              {features.powerRange && (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Power Range: {features.powerRange}</span>
                </div>
              )}
              {features.emeraldLightBlocker && (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>emerald Light Blocker</span>
                </div>
              )}
              {features.antiScratchCoating && (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Anti-Scratch Coating</span>
                </div>
              )}
              {features.antiGlareCoating && (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Anti-Glare Coating</span>
                </div>
              )}
              {features.antiReflectiveCoating && (
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Anti-Reflective Coating</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPriceBreakdown = (cartItem) => {
    const basePrice = cartItem.product.price || 0;
    const lensPrice =
      cartItem.purchaseType === "FRAME_WITH_LENS"
        ? cartItem.lensCustomization?.selectedPackage?.price || 0
        : 0;
    const quantity = cartItem.quantity || 1;
    const totalBasePrice = (basePrice + lensPrice) * quantity;
    const discountedPrice = cartItem.total || totalBasePrice;

    return (
      <div className="space-y-1">
        <p className="text-sm text-gray-600">
          Frame: ₹ {basePrice.toFixed(2)}
          {cartItem.purchaseType === "FRAME_WITH_LENS" && (
            <>
              <br />
              Lens Package: ₹ {lensPrice.toFixed(2)}
            </>
          )}
          {quantity > 1 && (
            <>
              <br />
              Quantity: {quantity}
            </>
          )}
        </p>
        <p className="text-base font-semibold text-gray-800">
          Total: ₹ {discountedPrice.toFixed(2)}
          {discountedPrice < totalBasePrice && (
            <span className="text-xs ml-2 text-emerald-400 line-through">
              ₹ {totalBasePrice.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    );
  };

  return (
    <>
      {cartLoading ? (
        <CartSkeleton />
      ) : (
        <div className="w-full">
          <div className="bg-opacity-90 overflow-y-auto overflow-x-hidden">
            <div className="transform translate-x-0 transition ease-in-out duration-700">
              <div
                className={`flex md:flex-row flex-col justify-center ${className}`}
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
                      <div
                        key={`${cartItem.product._id}-${cartItem.purchaseType}`}
                        className="md:flex items-start justify-between mt-5 py-5 border-t border-gray-200"
                      >
                        <div className="w-1/6 h-fit md:h-28 border">
                          <img
                            src={cartItem?.product.thumbnail}
                            alt={cartItem.product.name}
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

                            <select
                              onChange={(e) => {
                                dispatch(
                                  updateCart({
                                    productId: cartItem.product._id,
                                    quantity: e.target.value,
                                    purchaseType: cartItem.purchaseType,
                                    lensCustomization:
                                      cartItem.lensCustomization,
                                  })
                                );
                              }}
                              value={cartItem?.quantity}
                              className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                            >
                              {[...Array(11)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <p className="text-sm leading-3 text-gray-600 py-1">
                            {cartItem.product.frame?.color[0]?.name}
                          </p>

                          {renderLensDetails(cartItem)}

                          <div className="flex items-center justify-between pt-4 pr-6">
                            <p
                              onClick={() => {
                                dispatch(
                                  removeFromCart({
                                    productId: cartItem.product._id,
                                    purchaseType: cartItem.purchaseType,
                                  })
                                );
                              }}
                              className="text-md leading-3 underline text-red-500 cursor-pointer"
                            >
                              Remove
                            </p>
                            {renderPriceBreakdown(cartItem)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-center w-full h-[40vh] flex justify-center items-center text-5xl font-semibold text-slate-700">
                      Cart Is Empty!
                    </h1>
                  )}
                </div>

                {cart && cart.length > 0 && (
                  <div className="2xl:w-1/2 md:w-1/3 w-full bg-white h-full">
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
                            - ₹ {cart && calculateDiscount(cart).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-5">
                          <p className="text-base leading-none text-gray-800">
                            Tax
                          </p>
                          <p className="text-base leading-none text-gray-800">
                            ₹ 0{" "}
                            <span className="text-xs text-gray-500 line-through">
                              ₹ {tax}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center pb-6 justify-between pt-8">
                          <p className="text-2xl leading-normal text-gray-800">
                            Total
                          </p>
                          <p className="text-2xl font-semibold leading-normal text-right text-gray-800">
                            ₹ {cart && calculateSubtotal(cart).toFixed(2)}
                            <span className="pl-2 text-xs text-emerald-500 line-through">
                              ₹{" "}
                              {cart &&
                                (
                                  calculateSubtotal(cart) +
                                  calculateDiscount(cart) +
                                  tax +
                                  shipping
                                ).toFixed(2)}
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
        {`
          #scroll::-webkit-scrollbar {
            width: 1px;
          }
          #scroll::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          #scroll::-webkit-scrollbar-thumb {
            background: rgb(133, 132, 132);
          }
        `}
      </style>
    </>
  );
}

export default Cart;
