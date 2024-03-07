import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "../assets/api.json";
import ProductCard from "./ProductCard";
import SideFilters from "./SideFilters";
import { toast } from "react-toastify";
import "../styles/productsPage.css";
import sort from "../assets/Images/sort.png";
import filter from "../assets/Images/filter.png";

console.log(Products);
const ProductsPage = () => {
  return (
    <div className="overflow-hidden w-[100vw]">
      <div className="flex">
        <SideFilters />
        <div className="products w-[100vw] grid lg:grid-cols-3 lg:grid-cols-3 gap-5 ml-10 sm:grid-cols-2 justify-items-center">
          {Products.map((product) => {
            return (
              <div key={product.modelNo}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
        {/* Bottom filter option */}
      </div>
      <div className="bottom-bar flex fixed bottom-0 w-[100vw]">
        <div className="sort flex p-2 bg-slate-500 w-[50vw] p-2 flex justify-center gap-2">
          <img src={sort} alt="#" className="w-[20px]" />
          <p className="text-white">Sort by</p>
        </div>
        <span className="line w-[2px]"></span>
        <div className="filter flex bg-slate-500 w-[50vw] p-2 flex justify-center gap-2">
          <img src={filter} alt="" className="w-[20px]" />
          <p className="text-white">filters</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
