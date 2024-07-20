import React from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productAction";
import "../styles/sideFilters.css";

const SideFilters = ({ width, clas }) => {
  const dispatch = useDispatch();

  const handleFilter = async (filters) => {
    try {
      const response = await dispatch(getProducts(filters));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${clas} bg-white p-4 rounded shadow-sm shadow-slate-200 max-h-screen overflow-y-auto`}
      style={{ width: width }}
    >
      <div className="gender mb-6">
        <h3 className="text-xl font-semibold mb-4">Gender</h3>
        <div className="flex justify-between">
          {["Men", "Women", "Kids"].map((gender) => (
            <div
              key={gender}
              className="gender-option text-center cursor-pointer p-2 rounded transition-all duration-300 hover:bg-blue-50"
              onClick={() => handleFilter({ gender })}
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

      <div className="age mb-6">
        <h3 className="text-xl font-semibold mb-4">Age Group</h3>
        {["Below 12 years", "12 - 20 years", "Above 30 years"].map(
          (age, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                name="age"
                id={`age${index}`}
                className="form-checkbox"
              />
              <label htmlFor={`age${index}`}>{age}</label>
            </div>
          )
        )}
      </div>

      <div className="price mb-6">
        <h3 className="text-xl font-semibold mb-4">Price</h3>
        {["Below $100", "Below $500", "Below $1000", "Above $1000"].map(
          (price, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                name="price"
                id={`price${index}`}
                className="form-radio"
              />
              <label htmlFor={`price${index}`}>{price}</label>
            </div>
          )
        )}
      </div>

      <div className="frameType mb-6">
        <h3 className="text-xl font-semibold mb-4">Frame Type</h3>
        <div className="flex gap-4">
          {["FullFrame", "HalfFrame", "Rimless"].map((type) => (
            <div
              key={type}
              className="text-center cursor-pointer p-2 rounded transition-all duration-300 hover:bg-blue-50"
              onClick={() => handleFilter({ frameType: type })}
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

      <div className="frameShape mb-6">
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
              className="text-center cursor-pointer p-2 rounded transition-all duration-300 hover:bg-blue-50"
              onClick={() => handleFilter({ frameShape: shape })}
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

      <div className="colors mb-6">
        <h3 className="text-xl font-semibold mb-4">Frame Colors</h3>
        {["Black", "Gray", "Blue", "White", "Yellow"].map((color, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              name="color"
              id={`color${index}`}
              className="form-checkbox"
            />
            <span
              className={`circle w-4 h-4 rounded-full bg-${color.toLowerCase()}-500`}
            ></span>
            <label htmlFor={`color${index}`}>{color}</label>
          </div>
        ))}
      </div>

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
              />
              <label htmlFor={`material${index}`}>{material}</label>
            </div>
          )
        )}
      </div>

      <div className="collections">
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
            />
            <label htmlFor={`collection${index}`}>{collection}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideFilters;
