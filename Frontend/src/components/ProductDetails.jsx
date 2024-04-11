import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "./Slider";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const getProduct = async () => {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/products/allProducts/65ba138b7206bc492acf2046"
    );
    if (data.success) {
      setProduct(data.product);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="intro flex">
        <div className="images w-[60vw]">
          <Slider thumbNail={product.thumbNail} images={product.images} />
        </div>
        <div className="desc bg-slate-300 w-[100%] m-1 p-5 flex flex-col">
          <h1 className="text-3xl">{product.name}</h1>
          <p>{product.brand}</p>
          <p>Rating: {product.rating}</p>

          <p>Frame Color: </p>
          <div className="colors flex mt-3">
            <div className="border border-gray-400 rounded-full p-1">
              <span className="bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center"></span>
            </div>
            <div className="border border-gray-400 rounded-full p-1 ml-2">
              <span className="bg-blue-800 rounded-full w-4 h-4 flex items-center justify-center"></span>
            </div>
          </div>

          <div className="size mt-2">
            <p>Size</p>
            <div className="flex gap-2 mt-2">
              <button className="btn px-4 py-1 bg-white rounded-lg">S</button>
              <button className="btn px-4 py-1 bg-yellow-50 rounded-lg">L</button>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <button className="atc bg-white py-2 px-6 w-[100%]">Add to cart</button>
            <button className="buy bg-green-200 py-2 px-6 w-[100%]">Buy now</button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="desc bg-gray-100 bg-gray-200 m-3 p-3">
        <h1 className="font-semibold text-xl">Description</h1>
        <p>{product.description}</p>
      </div>

      {/* Reviews */}
      <div className="rev bg-green-100 m-3 p-3">
        <h1 className="font-semibold text-xl">Reviews</h1>
        <input type="text" placeholder="write your review" className="p-2 rounded-md" />
      </div>
    </>
  );
};

export default ProductDetails;
