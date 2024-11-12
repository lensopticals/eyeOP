import React from "react";

const Card = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="md:flex justify-evenly mt-5 py-5 border-t border-gray-200 bg-gray-50">
        <div className="w-1/6 h-fit md:h-28 border">
          <img
            src={data.thumbnail || "#"}
            alt
            className="w-full h-full object-center object-contain"
          />
        </div>
        <div className="md:pl-3 md:w-3/4">
          <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
            {data.orderId}
          </p>
          <div className="flex items-center justify-between w-full md:w-full pt-1 mt-2">
            <p className="text-base font-semibold leading-none text-gray-800">
              {data.name}
            </p>
            <p className="text-sm font-semibold leading-3 text-gray-600 py-1 px-5">
              ₹ {data.price?.toFixed(2)}
            </p>
            <p className="text-sm font-semibold leading-3 py-1 text-green-600">
              <span className="w-3 h-3 rounded-full bg-green-600 inline-block mr-2"></span>
              Delivered
            </p>
          </div>
          <p className="text-sm font-semibold leading-3 text-gray-600 py-1 mt-1">
            {data.material}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
