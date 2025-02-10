import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../redux/actions/orderActions";
import { Link, useParams } from "react-router-dom";

const order_ = {
  orderId: "ORD001",
  name: "Classic Aviator",
  material: "Metal",
  price: 1500,
  total: 1540,
  charges: 0,
  shipping: 40,
  quantity: 2,
  thumbnail: "/images/frames/cateye.jpg",
  user: "Abhay Rana",
  phone: "9058044318",
  address: "Bagi, New Tehri, Uttrakhand - 249124",
  date: "27th September 2023",
  method: "cash on delivery",
};

const cartItem = {
  product: {
    modelNo: "A12345", // Model number of the product
    thumbnail: "/images/frames/cateye.jpg", // URL of the product image
    frame: {
      color: [
        {
          colorCode: "#FF5733", // Color code for the product (e.g., Hex color)
          name: "Sunset Orange", // Name of the color
        },
      ],
    },
    name: "Stylish Sunglasses", // Name of the product
  },
  quantity: 2, // Quantity of the product in the cart
  total: 1599.99, // Total price for the quantity of the product
};

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderDetails);
  const { id } = useParams();

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
          <p className="text-sm sm:text-base">
            Order on {order.createdAt?.split("T")[0]} &nbsp; | &nbsp; #
            {order.orderId}
          </p>
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
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-gray-300 bg-gradient-to-r from-white to-green-50/70"
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
                  <Link to={`/product/${ord?.product?.name.toLowerCase().trim().replace(/\s+/g, "-")}/${ord?.product?._id}`} className="text-sm font-normal text-blue-900/80 cursor-pointer" >
                    {ord.product.name}
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      <span className="font-normal">Quantity: </span>
                      {ord?.quantity}
                    </p>
                    <p className="text-sm font-semibold text-emerald-500">
                      ₹ {ord.total?.toFixed(2)}
                    </p>
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
