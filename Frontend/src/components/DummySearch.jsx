import React, { useState, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProducts } from "../redux/actions/productAction";

const DummySearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useCallback(
    (searchTerm) => {
      if (searchTerm.trim().length >= 3) {
        navigate(`/shop/products?keyword=${encodeURIComponent(searchTerm)}`);
        dispatch(getProducts({ keyword: searchTerm }));
      }
    },
    [dispatch, navigate]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim().length >= 3) {
      debouncedSearch(keyword);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setSearchParams({ keyword: value });
  };

  return (
    <>
      {/* Mobile search button (navigates to search page) */}
      <div
        className="w-full cursor-pointer h-[2.6rem] flex md:hidden bg-gray-100 rounded items-center justify-start border border-gray-300"
        onClick={() => navigate("/search")}
      >
        <IoSearch className="text-xl mx-2 text-slate-800" />
        <p className="text-sm font-semibold text-slate-600">
          Search for Sunglasses
        </p>
      </div>

      {/* Desktop search bar */}
      <div className="w-full cursor-pointer h-[2.6rem] hidden md:flex bg-gray-50 items-center justify-start border border-gray-500 rounded">
        <IoSearch className="text-xl mx-2 text-slate-800" />
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            value={keyword}
            onChange={handleChange}
            placeholder="What are you looking for?"
            className="bg-gray-50 rounded w-full outline-none focus:bg-gray-50 p-2 text-base font-normal"
          />
        </form>
      </div>
    </>
  );
};

export default DummySearch;
