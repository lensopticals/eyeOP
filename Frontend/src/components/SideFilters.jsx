import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getProducts } from "../redux/actions/productAction";
import "../styles/sideFilters.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { LiaTimesSolid } from "react-icons/lia";

const SideFilters = ({ width, clas, setSort, setFilter }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  // State to manage selected filters based on URL parameters
  const filters = {
    keyword: searchParams.get("keyword") || "",
    gender: searchParams.get("gender") || "",
    frameType: searchParams.get("frameType") || "",
    shape: searchParams.get("shape") || "",
    material: searchParams.getAll("material") || [],
    price: [
      Number(searchParams.get("priceMin")) || 0,
      Number(searchParams.get("priceMax")) || 50000,
    ],
    colors: searchParams.getAll("colors") || [],
    collections: searchParams.getAll("collections") || [],
  };

  if (category) {
    filters.productType = category;
  }

  // Handle the filter application
  const handleFilter = (newFilter) => {
    const updatedFilters = { ...filters, ...newFilter };

    // Update URL parameters
    const params = new URLSearchParams();

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });

    setSearchParams(params);

    dispatch(getProducts(updatedFilters));
    setFilter(false);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (filterType, value) => {
    const currentFilterValues = filters[filterType];
    const updatedFilterValues = currentFilterValues.includes(value)
      ? currentFilterValues.filter((item) => item !== value)
      : [...currentFilterValues, value];
    handleFilter({ [filterType]: updatedFilterValues });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchParams({});
    if (category) {
      dispatch(
        getProducts({
          productType: category,
          gender: "",
          frameType: "",
          shape: "",
          material: [],
          price: [0, 50000],
          colors: [],
          collections: [],
        })
      );
    } else {
      dispatch(
        getProducts({
          gender: "",
          frameType: "",
          shape: "",
          material: [],
          price: [0, 50000],
          colors: [],
          collections: [],
        })
      );
    }
    setFilter(false);
  };

  useEffect(() => {
    dispatch(getProducts(filters));
  }, [searchParams]);

  return (
    <div
      className={`${clas} fixed md:sticky top-0 md:-top-16 left-0 bg-white p-4 rounded shadow-sm shadow-slate-200 max-h-full overflow-y-auto px-4 md:px-4 md:pr-4`}
      style={{ width: width }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-emerald-600">Filters</h2>
        <div className="flex justify-end gap-5">
          <button
            className="btn md:hidden px-4 py-1 text-white bg-red-600 rounded hover:bg-red-500"
            onClick={resetFilters}
          >
            Reset
          </button>
          <button
            className="btn md:hidden px-1 py-1 text-emerald-500 rounded"
            onClick={() => {
              setSort(false);
              setFilter(false);
            }}
          >
            <LiaTimesSolid className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Gender Filter */}
      <div className="gender mb-6">
        <h3 className="text-xl font-semibold mb-4">Gender</h3>
        <div className="flex gap-10 md:justify-between">
          {["Men", "Women", "Kids"].map((gender) => (
            <div
              key={gender}
              className={`gender-option text-center cursor-pointer p-2 rounded transition-all duration-300 ${
                filters.gender === gender ? "bg-green-100" : ""
              } hover:bg-gray-50`}
              onClick={() =>
                handleFilter({
                  gender: filters.gender === gender ? "" : gender,
                })
              }
            >
              <img
                src={`https://cdn.eyemyeye.com/shared/icons/${gender}.svg`}
                alt={gender}
                className="m-auto w-12 h-12"
              />
              <p className="mt-2">{gender}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="price mb-6">
        <h3 className="text-xl font-semibold mb-4">Price</h3>
        <div className="px-4 md:px-2">
          <Slider
            range
            min={0}
            max={50000}
            step={1000}
            value={filters.price}
            onChange={(price) =>
              handleFilter({ price, priceMin: price[0], priceMax: price[1] })
            }
            allowCross={false}
            trackStyle={[{ backgroundColor: "#1FA751" }]}
            handleStyle={[
              { borderColor: "#1FA751" },
              { borderColor: "#1FA751" },
            ]}
          />
          <div className="flex justify-between mt-2">
            <span>₹{filters.price[0]}</span>
            <span>₹{filters.price[1]}</span>
          </div>
        </div>
      </div>

      {/* Frame Type Filter */}
      <div className="frameType mb-6">
        <h3 className="text-xl font-semibold mb-4">Frame Type</h3>
        <div className="flex gap-10">
          {["FullFrame", "HalfFrame", "Rimless"].map((type) => (
            <div
              key={type}
              className={`text-center cursor-pointer p-2 rounded transition-all duration-300 ${
                filters.frameType === type ? "bg-green-100" : ""
              } hover:bg-gray-50`}
              onClick={() =>
                handleFilter({
                  frameType: filters.frameType === type ? "" : type,
                })
              }
            >
              <img
                src={`https://cdn.eyemyeye.com/shared/icons/${type}.svg`}
                alt={type}
                className="m-auto w-12 h-12"
              />
              <p className="mt-2 text-sm">
                {type.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Frame Shape Filter */}
      <div className="shape mb-6">
        <h3 className="text-xl font-semibold mb-4">Frame Shape</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Aviator",
            "Butterfly",
            "Cateye",
            "Clubmaster",
            "Hexagon",
            "Oval",
            "Rectangle",
            "Round",
            "Square",
            "Wayfarer",
          ].map((shape) => (
            <div
              key={shape}
              className={`text-center cursor-pointer p-2 rounded transition-all duration-300 ${
                filters.shape === shape ? "bg-green-100" : ""
              } hover:bg-gray-50`}
              onClick={() =>
                handleFilter({ shape: filters.shape === shape ? "" : shape })
              }
            >
              <img
                src={`https://cdn.eyemyeye.com/shared/icons/${shape}.svg`}
                alt={shape}
                className="m-auto w-10 h-10"
              />
              <p className="mt-2 text-sm">{shape}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Frame Colors Filter */}
      <div className="colors mb-6">
        <h3 className="text-xl font-semibold mb-4">Frame Colors</h3>
        {["Black", "Gray", "emerald", "White", "Yellow"].map((color, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              name="color"
              id={`color${index}`}
              className="form-checkbox"
              onChange={() => handleCheckboxChange("colors", color)}
              checked={filters.colors.includes(color)}
            />
            <span
              className={`circle w-4 h-4 rounded-full border border-gray-400`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></span>
            <label htmlFor={`color${index}`}>{color}</label>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div className="material mb-6">
        <h3 className="text-xl font-semibold mb-4">Material</h3>
        {["Acetate", "Metal", "Nylon", "Plastic", "Stainless Steel"].map(
          (material, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                name="material"
                id={`material${index}`}
                className="form-checkbox"
                onChange={() => handleCheckboxChange("material", material)}
                checked={filters.material.includes(material)}
              />
              <label htmlFor={`material${index}`}>{material}</label>
            </div>
          )
        )}
      </div>

      {/* Collections Filter */}
      <div className="collections mb-6">
        <h3 className="text-xl font-semibold mb-4">Collections</h3>
        {[
          "Bamboo Eyeglasses",
          "Color Blind Glasses",
          "Color Changing Frames",
          "Computer Glasses",
          "Economy Eyeglasses",
        ].map((collection, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              name="collection"
              id={`collection${index}`}
              className="form-checkbox"
              onChange={() => handleCheckboxChange("collections", collection)}
              checked={filters.collections.includes(collection)}
            />
            <label htmlFor={`collection${index}`}>{collection}</label>
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <div className="reset-button mt-6">
        <button
          onClick={resetFilters}
          className="bg-red-500 text-white px-4 py-2 rounded transition-all duration-300 hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SideFilters;
