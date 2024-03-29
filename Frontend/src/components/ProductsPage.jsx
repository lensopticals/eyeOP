import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "../assets/api.json";
import ProductCard from "./ProductCard";
import SideFilters from "./SideFilters";
import { toast } from "react-toastify";
import "../styles/productsPage.css";
import sortImg from "../assets/Images/sort.png";
import filterImg from "../assets/Images/filter.png";

const ProductsPage = () => {
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const handlefilters = () => {
    if (filter) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  };
  const handleSort = () => {
    if (sort) {
      setSort(false);
    } else {
      setSort(true);
    }
  };
  return (
    <div className="overflow-hidden w-[100vw] mt-14">
      {!filter ? (
        <div className="flex">
          <SideFilters width="22rem" clas="sideBar" />
          <div className="products w-[100vw] h-[100vh] grid lg:grid-cols-3 gap-5 ml-10 sm:grid-cols-2 justify-items-center">
            {Products.map((product) => {
              return (
                <div key={product.modelNo}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="sideFilter">
          <SideFilters width="100vw" clas="sideBar2" />
        </div>
      )}

      {/* Bottom filter option */}
      <div className="bottom-bar flex fixed top-14 w-[100vw]">
        <div
          className="sort flex p-2 bg-purple-400 w-[50vw] p-2 flex justify-center gap-2"
          onClick={handleSort}
        >
          <img src={sortImg} alt="#" className="w-[20px]" />
          <p className="text-white">Sort by</p>
        </div>
        <span className="line w-[2px]"></span>
        <div
          className="filter flex bg-pink-300 w-[50vw] p-2 flex justify-center gap-2"
          onClick={handlefilters}
        >
          <img src={filterImg} alt="" className="w-[20px]" />
          <p className="text-white">filters</p>
        </div>
      </div>

      {sort && (
        <div className="desc fixed top-[6.33rem] bg-yellow-100 w-[50vw] text-center flex flex-col gap-2">
          <div className="asc p-2 active:bg-white">low to high</div>
          <div className="des p-2">high to low</div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
