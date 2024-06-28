import React, { useState, useEffect } from "react";
import axios from "axios";
// import Products from "../assets/api.json";
import ProductCard from "./ProductCard";
import SideFilters from "./SideFilters";
import { toast } from "react-toastify";
import "../styles/productsPage.css";
import sortImg from "../assets/Images/sort.png";
import filterImg from "../assets/Images/filter.png";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productAction";
import { clearErrors } from "../redux/features/productSlice";
const ProductsPage = () => {
  const navigate = useNavigate();
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

  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.product);

  const { keyword } = useParams();

  // Pagination

  const [searchParams, setSearchParams] = useSearchParams(1);

  // Read query parameters
  const pageParam = Number(searchParams.get("page"));
  const finalCategory = searchParams.get("category")?.toString();

  // You can read other query parameters similarly

  const handlePageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    // Set initial query parameters on component mount
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
    }
  }, [searchParams]);

  // Filters
  // Price

  const [price, setPrice] = useState([0, 15000000]);
  const priceHandler = (e, newPrice) => {
    setPrice(e);
  };

  // Sort By

  // Category

  const [category, setCategory] = useState();
  const deleteCategoryParam = () => {
    searchParams.set("page", "1");
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!category) {
      return;
    }
    searchParams.set("category", category);
    setSearchParams(searchParams);
  }, [category]);

  useEffect(() => {
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }, [category, price]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    dispatch(
      getProducts({
        keyword,
        currentPage: pageParam,
        price,
        category: finalCategory,
      })
    );
  }, [keyword, pageParam, price, finalCategory]);

  return (
    <div className="overflow-hidden w-[100vw] mt-2">
      {!filter ? (
        <div className="flex">
          <SideFilters width="22rem" clas="sideBar" />
          <div className="products w-[100vw] h-[100vh] grid lg:grid-cols-3 gap-5 ml-10 sm:grid-cols-2 justify-items-center">
            {products.map((product) => {
              return (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="sideFilter mt-10 ml-3">
          <SideFilters width="100vw" clas="sideBar2" />
        </div>
      )}

      {/* Bottom filter option */}
      <div className="bottom-bar flex fixed top-14 w-[100vw]">
        <div
          className="sort flex bg-purple-400 w-[50vw] p-2 justify-center gap-2"
          onClick={handleSort}
        >
          <img src={sortImg} alt="#" className="w-[20px]" />
          <p className="text-white">Sort by</p>
        </div>
        <span className="line w-[2px]"></span>
        <div
          className="filter flex bg-pink-300 w-[50vw] p-2 justify-center gap-2"
          onClick={handlefilters}
        >
          <img src={filterImg} alt="#" className="w-[20px]" />
          <p className="text-white">filters</p>
        </div>
      </div>

      {sort && (
        <div className="desc fixed top-[6.5rem] bg-yellow-100 w-[50vw] text-center flex flex-col gap-2">
          <div className="asc p-2 active:bg-white">low to high</div>
          <div className="des p-2">high to low</div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
