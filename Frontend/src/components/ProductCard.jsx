import React, { useState } from "react";
import heart from "../assets/Images/heart.png";
import heartRed from "../assets/Images/heart-red.png";
import atcImage from "../assets/Images/add-to-cart.png";
import { useNavigate } from "react-router-dom";
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

  const productClick = () => {
    // getProduct(product._id);
    navigate(`/product/${product._id}`);
  };

  return (
    <>
      <div className="product m-2 bg-gray-100 w-[20vw] p-2 rounded-xl pb-2">
        <img
          src={product.thumbNail}
          alt="#"
          className="thumbNail rounded-xl"
          onClick={productClick}
        />
        <div className="specs m-2">
          <div className="flex">
            <h3 className="productName text-lg md:text-base sm:text-sm">
              {product.name}
            </h3>
            <img
              src={whiteList}
              alt="#"
              className="w-5 h-5 ml-auto mr-1 md:w-4 md:h-4 sm:w-3 sm:h-3 heart"
              onClick={whiteClick}
            />
          </div>
          <p className="size font-thin mt-1 text-sm md:text-xs sm:text-[10px]">
            Size: Medium
          </p>
          <div className="flex mt-1">
            <h4 className="price text-slate-700 font-semibold md:text-sm sm:text-xs">
              ${product.price}
            </h4>
            {/* <div className="colors ml-auto flex">
              <div className="border border-gray-400 rounded-full p-1">
                <span className="bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center"></span>
              </div>
              <div className="border border-gray-400 rounded-full p-1 ml-2">
                <span className="bg-blue-800 rounded-full w-4 h-4 flex items-center justify-center"></span>
              </div>
            </div> */}
          </div>
        </div>
        <div className="atc bg-slate-200 p-1 mt-4 rounded-lg text-center text-black hover:bg-slate-300 md:text-sm sm:text-xs">
          Add to cart
        </div>
      </div>
    </>
  );
};

export default ProductCard;
