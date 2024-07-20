import React, { useState } from "react";
import heart from "../assets/Images/heart.png";
import heartRed from "../assets/Images/heart-red.png";
import atcImage from "../assets/Images/add-to-cart.png";
import { Link, useNavigate } from "react-router-dom";
// import { getProduct } from "../redux/actions/productActions";

const ProductCard = ({ product }) => {
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
    <div className="relative border overflow-hidden border-slate-200 hover:scale-[1.02] transition-all ease-in-out duration-200 hover:shadow-md mt-3 bg-gray-00  h-fit  rounded-[0.4rem] ">
      <div className="absolute z-50 px-3 flex justify-between items-end top-3 left-0 w-full py-1">
        <h3 className="w-fit text-xs bg-emerald-50 font-semibold text-emerald-500 rounded flex justify-center items-center py-1 px-3">
          New Arrival
        </h3>
        <img
          src={whiteList}
          alt="#"
          className="w-5 h-5 heart"
          onClick={whiteClick}
        />
      </div>
      <Link to={`/product/${product._id}`}>
        <div className="p-3 pt-7 pb-0 bg-white">
          <img
            src={product.thumbnail}
            alt={product?.title}
            className="max-h-48 h-40 w-full max-w-60 object-cover rounded-xl"
          />
          {/* Tag */}
        </div>
        <div className="specs px-3 py-4">
          <div className="flex">
            <h3 className="font-semibold text-lg md:text-base sm:text-sm">
              {product.name}
            </h3>
          </div>
          <p className="size font-normal mt-1 text-sm md:text-xs sm:text-[10px]">
            Size: Medium
          </p>
          <div className="flex mt-1">
            <h4 className="price font-bold text-slate-700 lg:text-[1rem] md:text-sm text-xs">
              ${product.price}
            </h4>
          </div>
        </div>
        <div className="relative overflow-hidden text-sm px-5 py-1 text-yellow-600 bg-gradient-to-r from-yellow-200/75 via-yellow-200/25 to-yellow-50">
          <div className="relative z-10 font-semibold">
            Get FREE BLU Screen Lenses
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
