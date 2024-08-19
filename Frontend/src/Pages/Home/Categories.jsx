import React, { useState, useEffect } from "react";
import SmallUnderline from "../../components/SmallUnderline";

const categories = {
  Men: [
    { name: "Eyeglasses", image: "/images/categories/eyeglasses.webp" },
    { name: "Sunglasses", image: "/images/categories/sunglasses.webp" },
    {
      name: "Computer Glasses",
      image: "/images/categories/computer-glasses.webp",
    },
    {
      name: "Contact Lenses",
      image: "/images/categories/contact-lenses.webp",
    },
    { name: "Accessories", image: "/images/categories/accessories.webp" },
  ],
  Women: [
    { name: "Eyeglasses", image: "/images/categories/eyeglasses-women.webp" },
    { name: "Sunglasses", image: "/images/categories/sunglasses-women.webp" },
    {
      name: "Computer Glasses",
      image: "/images/categories/computer-glasses-women.webp",
    },
    {
      name: "Contact Lenses",
      image: "/images/categories/contact-lenses-women.webp",
    },
    {
      name: "Accessories",
      image: "/images/categories/accessories-women.webp",
    },
  ],
};
const Categories = () => {
  const [activeTab, setActiveTab] = useState("Men");
  const [displayedCategories, setDisplayedCategories] = useState(
    categories[activeTab]
  );

  useEffect(() => {
    // Add a slight delay for a smooth transition effect
    const timeout = setTimeout(() => {
      setDisplayedCategories(categories[activeTab]);
    }, 300);

    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <div className="p-3 pb-16 bg-white text-black">
      <h2 className="relative text-3xl md:text-4xl font-semibold text-slate-700 text-center mb-10">
        Shop by Category
        {/* <SmallUnderline className={"-bottom-4"} /> */}
      </h2>
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-1 text-lg transition-all duration-300 ease-in-out ${
            activeTab === "Men"
              ? "text-amber-500 border-b-4 font-semibold rounded border-amber-500"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Men")}
        >
          Men
        </button>
        <button
          className={`px-4 py-1 text-lg transition-all duration-300 ease-in-out ${
            activeTab === "Women"
              ? "text-amber-500 border-b-4 font-semibold rounded border-amber-500"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Women")}
        >
          Women
        </button>
      </div>
      <div className="pt-6 md:px-10 lg:px-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {displayedCategories.map((category, index) => (
          <div
            key={index}
            className="text-center transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 bg-amber-500 pt-2 rounded-full object-cover mx-auto mb-2 transition-opacity duration-300 ease-in-out"
              loading="lazy"
              style={{ imageRendering: "auto" }}
            />
            <p className="text-lg">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
