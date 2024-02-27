import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "../assets/api.json";
import ProductCard from "./ProductCard";
import SideFilters from "./SideFilters";

console.log(Products);
const ProductsPage = () => {
  return (
    <>
    <div className="flex">
      <SideFilters />
      <div className="products grid grid-cols-3 gap-5 ml-10">
        {Products.map((product) => {
          return (
            <div key={product.modelNo}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default ProductsPage;
