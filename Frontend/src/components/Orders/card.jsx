import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data, id, ord, products }) => {
  const navigate = useNavigate();
  const handleClick = async (orderId) => {
    navigate(`/orders/${orderId}`);
  };
  useEffect(() => {
    console.log(data);
  });
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="md:flex items-center p-4">
        <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0">
          <div className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
            <img
              src={data.thumbnail || "/placeholder.svg"}
              alt={data.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
        <div className="md:pl-6 md:w-3/4 lg:w-4/5">
          <div className="flex flex-wrap items-center justify-between mb-2">
            <p className="text-xs text-gray-500 font-medium">Order ID: {ord}</p>
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
              Delivered
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{data.name}</h3>
          <div className="flex items-center justify-between mb-2">
            {products > 1 ? (
              <p className="text-sm font-semibold text-gray-700 underline">
                +{products - 1} Products
              </p>
            ) : (
              <p></p>
            )}
            <p className="text-lg font-semibold text-blue-700">
              ₹{data.price?.toFixed(2)}
            </p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              className="text-blue-800/90 underline hover:text-blue-800 text-sm font-semibold px-3 py-1 transition-colors duration-300 ease-in-out"
              onClick={() => {
                handleClick(id);
              }}
            >
              View Details
            </button>
            <div className="flex items-center">
              <span className="text-gray-800 text-sm mr-2">Rate Product:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-gray-400 hover:text-yellow-500 focus:outline-none"
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
