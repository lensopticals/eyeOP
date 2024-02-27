import React from "react";
import atcImage from "../Images/add-to-cart.png";
const ProductCard = ({ product }) => {
  return (
    <>
      <div className="m-2 bg-gray-100 w-[20vw] h-[50vh] p-2 rounded-xl">
        <img
          src={product.thumbNail}
          alt="#"
          className="rounded-xl h-[8rem] w-[20vw]"
        />
        <div className="specs m-2">
          <div className="flex">
            <h3 className="text-lg">{product.name}</h3>
            <img src={atcImage} alt="#" className="w-5 h-5 ml-auto" />
          </div>
          <p className="font-thin mt-1 text-sm">Size: Medium</p>
          <div className="flex mt-1">
            <h4 className="text-slate-700 font-semibold">${product.price}</h4>
            <div className="colors ml-auto flex">
              <div className="border border-gray-400 rounded-full p-1">
                <span className="bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center"></span>
              </div>
              <div className="border border-gray-400 rounded-full p-1 ml-2">
                <span className="bg-blue-800 rounded-full w-4 h-4 flex items-center justify-center"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-200 p-1 mt-4 rounded-lg text-center text-black hover:bg-green-100">Buy now</div>
      </div>
    </>
  );
};

export default ProductCard;