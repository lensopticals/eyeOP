import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProducts } from "../redux/actions/productAction";

const DummySearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.length <= 3) return;
    navigate(`/shop/products?keyword=${encodeURIComponent(searchValue)}`);
    dispatch(getProducts({ keyword: searchValue }));
  };
  useEffect(() => {
    if (!keyword) {
      setSearchValue("");
    }
  }, [keyword]);
  return (
    <>
      <div className="w-full md:hidden cursor-pointer h-[2.6rem] hidden sm:flex bg-gray-100 rounded items-center justify-start border border-gray-300">
        <IoSearch className="text-xl mx-2 text-slate-800" />
        <p
          onClick={() => navigate("/search")}
          className="text-sm font-semibold text-slate-600"
        >
          Search for Sunglasses
        </p>
      </div>

      <div className="w-full cursor-pointer h-[2.6rem] hidden sm:flex bg-gray-100 rounded items-center justify-start border border-gray-300">
        <IoSearch className="text-xl mx-2 text-slate-800" />
        <form onSubmit={handleSearch} className="w-full">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} // Update state on input change
            placeholder="What are you looking for?"
            className="bg-gray-100 w-full outline-none focus:bg-gray-50 p-2 text-base font-normal"
          />
        </form>
      </div>
    </>
  );
};

export default DummySearch;
