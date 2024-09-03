import React, { useState } from "react";
import heart from "../assets/Images/heart.png";
import heartRed from "../assets/Images/heart-red.png";
import atcImage from "../assets/Images/add-to-cart.png";
import { Link, useNavigate } from "react-router-dom";
// import { getProduct } from "../redux/actions/productActions";

const ProductCard = ({ product, className }) => {
  const navigate = useNavigate();
  const [whiteList, setWhiteList] = useState(heart);
  const whiteClick = () => {
    if (whiteList == heart) {
      setWhiteList(heartRed);
    } else {
      setWhiteList(heart);
    }
  };

  return (
    <div
      className={`relative border overflow-hidden border-slate-200 hover:scale-[1.02] transition-all ease-in-out duration-200 hover:shadow-md mt-3 bg-gray-00  h-fit  rounded-[0.4rem] ${className}`}
    >
      <div className="absolute z-0 px-3 flex justify-between items-center md:items-end top-3 left-0 w-full py-1">
        <h3 className="w-fit text-[0.7rem] md:text-xs bg-emerald-50 font-semibold text-emerald-500 rounded flex justify-center items-center py-1 px-3">
          {product?.tag}
        </h3>
        <img
          src={whiteList}
          alt="#"
          className="w-5 h-5 heart"
          onClick={whiteClick}
        />
      </div>
      <Link to={`/product/${product._id}`} className="h-full">
        <div className="p-3 pt-10 md:pt-7 pb-0 bg-white flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product?.title}
            className="max-h-48 h-[5rem] md:h-40 w-full md:max-w-64 object-contain rounded-xl"
          />
          {/* Tag */}
        </div>
        <div className="specs px-3 py-3 md:py-4">
          <div className="flex">
            <h3 className="font-semibold text-sm md:text-base sm:text-sm">
              {product.name}
            </h3>
          </div>
          <p className="size font-normal mt-1 text-sm md:text-xs sm:text-[10px]">
            Size: {product?.frame.size}
          </p>
          <div className="flex gap-5 items-center justify-between mt-1">
            <h4 className="price font-semibold text-emerald-500 lg:text-[1rem] md:text-sm text-xs">
              <span className="mr-[2px]">₹</span>
              {product.price}
            </h4>
            <h5 className="flex items-center relative space-x-2 button">
              <span className="text-green-600 font-medium text-xs bg-green-100 rounded-full px-2 py-1">
                <span className="text-xs md:text-sm">
                  {product.discountPercentage}
                </span>
                % OFF
              </span>
            </h5>
          </div>
        </div>
        <div className="relative  overflow-hidden text-[0.6rem] leading-normal sm:text-xs md:text-sm px-2 md:px-5 py-1 text-yellow-600 bg-gradient-to-r from-yellow-200/75 via-yellow-200/25 to-yellow-50">
          <div className="relative z-10 font-semibold">
            {product?.specialOffer}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-200/25 to-yellow-50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200 to-transparent animate-shine"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
