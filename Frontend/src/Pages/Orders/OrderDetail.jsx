import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../redux/actions/orderActions";
import { Link, useParams } from "react-router-dom";
import { FaCalendarAlt, FaCheck, FaCheckCircle, FaClock } from "react-icons/fa";
import UploadPrescriptions from "./UploadPrescriptions";
import ViewPrescriptionModal from "./ViewPrescriptionModal";

const OrderDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderDetails);
  const { id } = useParams();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);
  // const slug = order?.product?.name.toLowerCase().trim().replace(/\s+/g, "-");

  return (
    <>
      {order ? (
        <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="font-semibold text-xl sm:text-2xl mb-2">
            Order Details
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendarAlt className="w-4 h-4" />
              {formatDate(order.createdAt)}
              <FaClock className="w-4 h-4 ml-2" />
              {formatTime(order.createdAt)}
              <p className="text-sm sm:text-base">
                {" "}
                &nbsp; | &nbsp; #{order.orderId}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row mt-6 gap-6 p-4 sm:p-6 border border-gray-300 rounded-lg">
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-gray-600 mb-2">
                Shipping Address
              </h2>
              <p className="text-sm sm:text-base">
                {order.shippingInfo?.address}, {order.shippingInfo?.city},{" "}
                {order.shippingInfo?.state}, {order.shippingInfo?.pincode}
              </p>
              <p className="text-sm sm:text-base mt-1">
                {order.shippingInfo?.country}
              </p>
              <div className="flex gap-2 mt-2 text-sm sm:text-base">
                <p className="font-semibold">Phone:</p>
                <p>{order.shippingInfo?.phone}</p>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-lg text-gray-600 mb-2">
                Payment Method
              </h2>
              <p className="text-sm sm:text-base">{order.paymentMethod}</p>
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-lg text-gray-600 mb-2">
                Summary
              </h2>
              <div className="space-y-1">
                <div className="flex justify-between text-sm sm:text-base">
                  <p>Item(s) Subtotal:</p>
                  <p className="font-semibold">₹{order.totalAmount}</p>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <p>Shipping:</p>
                  <p className="font-semibold">₹{order.shippingCharge}</p>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <p>Delivery Charges:</p>
                  <p className="font-semibold">₹{order.deliveryCharge}</p>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-semibold">
                  <p>Total:</p>
                  <p>₹{order.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          <div className="mt-8 space-y-4">
            {order.orderItems?.map((ord, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-gray-300 bg-gradient-to-r from-white to-blue-50/70"
              >
                <div className="w-full sm:w-24 h-24 p-2 border bg-white flex-shrink-0">
                  <img
                    src={ord?.product?.thumbnail || "/placeholder.svg"}
                    alt={ord?.product?.name}
                    className="w-full h-full object-center object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2">
                    <p className="text-xs font-semibold text-purple-900/70">
                      {ord?.product?.brand}
                    </p>
                    <p className="flex gap-2 items-center text-xs font-semibold text-gray-600">
                      <span
                        className="w-3 h-3 rounded-full inline-block"
                        style={{
                          backgroundColor:
                            ord.product.frame.color[0]?.colorCode,
                        }}
                      ></span>
                      {ord.product.frame.color[0].name}
                    </p>
                  </div>
                  <Link
                    to={`/product/${ord?.product?.name
                      .toLowerCase()
                      .trim()
                      .replace(/\s+/g, "-")}/${ord?.product?._id}`}
                    className="text-sm font-normal text-blue-900/80 cursor-pointer"
                  >
                    {ord.product.name}
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      <span className="font-normal">Quantity: </span>
                      {ord?.quantity}
                    </p>
                    <div className="flex flex-col gap-2 items-end">
                      <p className="text-sm font-semibold text-emerald-500">
                        ₹ {ord.total?.toFixed(2)}
                      </p>
                      {ord?.purchaseType === "FRAME_WITH_LENS" && (
                        <>
                          {ord?.lensCustomization?.prescription ? (
                            <>
                              <ViewPrescriptionModal
                                key={`${id}-${ord?._id}`}
                                isOpen={isViewOpen}
                                onClose={() => setIsViewOpen(false)}
                                prescription={
                                  ord?.lensCustomization?.prescription
                                }
                              />
                              <button
                                onClick={() => setIsViewOpen(true)}
                                className="py-2 text-emerald-600 flex gap-2 items-center rounded-lg  transition-colors"
                              >
                                <FaCheckCircle /> Prescription Uploaded
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setIsOpen(true)}
                                className="text-white p-2 rounded bg-emerald-600 hover:bg-emerald-700 transition-colors"
                              >
                                Upload Prescription
                              </button>
                              <UploadPrescriptions
                                key={`${id}-${ord?._id}`}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                orderId={id}
                                orderItemId={ord?._id}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>No Order on this id</>
      )}
    </>
  );
};

export default OrderDetail;
