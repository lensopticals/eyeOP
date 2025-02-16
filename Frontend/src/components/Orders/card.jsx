import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";

const Card = ({ order }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/order/${order.orderId}`);

  useEffect(() => {
    console.log(order);
  }, []);

  const mainProduct = order.orderItems[0].product;
  const additionalProducts = order.orderItems.slice(1);
  const displayedProducts = additionalProducts.slice(0, 3);
  const hiddenProductsCount =
    additionalProducts.length - displayedProducts.length;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs text-gray-500 font-medium">Order ID: {order.orderId}</p>
          <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
            Delivered
          </span>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-1/4">
            <div className="rounded-md overflow-hidden">
              <img
                src={mainProduct.thumbnail || "/placeholder.svg"}
                alt={mainProduct.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          <div className="w-3/4">
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              {mainProduct.name}
            </h3>
            <p className="text-lg font-semibold text-blue-700 mb-2">
              ₹{mainProduct.price.toFixed(2)}
            </p>

            {additionalProducts.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  +{additionalProducts.length} More{" "}
                  {additionalProducts.length === 1 ? "Product" : "Products"}
                </p>
                <div className="flex space-x-2 overflow-x-auto">
                  {displayedProducts.map((product, index) => (
                    <div key={index} className="flex-shrink-0 w-16">
                      <div className="rounded-md overflow-hidden">
                        <img
                          src={product.product.thumbnail || "/placeholder.svg"}
                          alt={product.product.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  ))}
                  {hiddenProductsCount > 0 && (
                    <div className="flex-shrink-0 w-16 flex items-center justify-center bg-gray-50 rounded-md text-sm font-semibold text-gray-600">
                      +{hiddenProductsCount} More
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleClick}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center transition-colors duration-300 ease-in-out"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
          <div className="flex items-center">
            <span className="text-gray-800 text-sm mr-2">Rate:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="text-gray-400 hover:text-yellow-500 focus:outline-none"
              >
                <Star className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
