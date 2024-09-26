import React from "react";

const order = {
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
  return (
    <>
      <div className="max-w-[1200px] m-auto p-5">
        <h1 className="font-semibold text-xl">Order Details</h1>
        <p className="text-[0.92rem]">
          Order on {order.date} &nbsp; | &nbsp; #{order.orderId}
        </p>
        <div className="flex mt-8 gap-20 p-5 border border-gray-500 rounded-lg">
          <div className="">
            <h2 className="font-semibold text-lg text-gray-600">
              Shipping Address
            </h2>
            <div className="flex mt-2 justify-between">
              <h3 className="font-semibold py-1">{order.user}</h3>
              <p className="py-1 px-2 bg-gray-100">Change</p>
            </div>
            <p className="mt-2 w-[70%]">{order.address}</p>
            <div className="flex gap-2 mt-2">
              <p className="font-semibold">Phone: </p>
              <p>{order.phone}</p>
            </div>
          </div>

          <div className="">
            <h2 className="font-semibold text-lg text-gray-600">
              Payment Method
            </h2>
            <p className="mt-2">{order.method}</p>
          </div>

          <div className="summary ml-auto">
            <h2 className="font-semibold text-lg text-gray-600">Summary</h2>
            <div className="flex justify-between">
              <p className="w-1/2">Item(s) Subtotal: </p>
              <p className="font-semibold">₹{order.price}</p>
            </div>
            <div className="flex justify-between">
              <p className="w-1/2">Shipping: </p>
              <p className="font-semibold">₹{order.shipping}</p>
            </div>
            <div className="flex justify-between">
              <p className="w-1/2">Delivery Charges: </p>
              <p className="font-semibold">₹{order.charges}</p>
            </div>
            <div className="flex justify-between">
              <p className="w-1/2">Total: </p>
              <p className="font-semibold">₹{order.total}</p>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="flex py-5 items-center gap-5 border-b border-gray-300 mt-5 bg-gradient-to-r from-white to-green-50/70">
          <div className="w-20 md:w-24 h-[4.5rem] p-2 border bg-white">
            <img
              src={cartItem?.product.thumbnail}
              alt
              className="w-full h-full object-center object-contain"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-end justify-between">
              <p className="text-xs font-semibold text-purple-900/70">
                {cartItem.product.modelNo}
              </p>
              <p className="flex gap-2 items-center text-xs font-semibold text-gray-600">
                <p
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: cartItem.product.frame.color[0]?.colorCode,
                  }}
                ></p>{" "}
                {cartItem.product.frame.color[0].name}
              </p>
            </div>
            <div className="flex items-center gap-2 justify-between w-full">
              <p className="text-sm font-normal text-blue-900/80">
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
      </div>
    </>
  );
};

export default OrderDetail;
