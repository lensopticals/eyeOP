import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import SideFilters from "../../components/SideFilters";
import { toast } from "react-toastify";
import "../../styles/productsPage.css";
import sortImg from "../../assets/Images/sort.png";
import filterImg from "../../assets/Images/filter.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productAction";
import { clearErrors } from "../../redux/features/productSlice";
import { ProductCardSkeleton } from "../../components/Skeletons/ProductCardSkeleton";
import SmallUnderline from "../../components/SmallUnderline";
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

  const [searchParams, setSearchParams] = useSearchParams(1);

  // Read query parameters
  const pageParam = Number(searchParams.get("page"));
  const keyword = searchParams.get("query") || "";
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

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    // dispatch(getProducts({ keyword }));
  }, [keyword]);

  return (
    <div className="overflow-hidden py-12 md:py-8">
      <div className="flex md:hidden justify-end px-6">
        <button
          onClick={() => {
            navigate("/shop/products");
            window.location.reload();
          }}
          className="text-emerald-600 border border-emerald-600 bg-white-50 max-h-7 py-0 rounded px-2"
        >
          View All
        </button>
      </div>
      <div className="flex md:hidden justify-center">
        <h1 className="relative text-center mt-1 mb-4 text-2xl uppercase tracking-wider font-semibold text-slate-800">
          All Products
          <SmallUnderline className={"w-8 sm:w-10 -bottom-2"} />
        </h1>
      </div>
      {!filter ? (
        <div className="flex">
          <SideFilters width="25rem" clas="sideBar" />
          <div className="products w-full h-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 mx-5 md:mx-10 sm:grid-cols-2 ">
            {loading
              ? Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton />)
              : products.map((product) => {
                  return (
                    <div key={product._id}>
                      <ProductCard product={product} />
                    </div>
                  );
                })}
          </div>
        </div>
      ) : (
        <div className="sideFilter mt-0">
          <SideFilters
            width="100vw"
            setSort={setSort}
            setFilter={setFilter}
            clas="sideBar2 z-50"
          />
        </div>
      )}

      {/* Bottom filter option */}
      <div className="bottom-bar text-sm flex gap-0 fixed top-16 z-20 w-[100vw]">
        <div
          className="sort flex items-center bg-purple-400 w-[50vw] py-1.5 justify-center gap-2"
          onClick={handleSort}
        >
          <img src={sortImg} alt="#" className="w-[10px]" />
          <p className="text-white">Sort by</p>
        </div>
        <span className="line w-[2px]"></span>
        <div
          className="filter flex items-center py-1.5 bg-pink-300 w-[50vw] justify-center gap-2"
          onClick={handlefilters}
        >
          <img src={filterImg} alt="#" className="w-[10px]" />
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
