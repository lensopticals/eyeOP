import React, { useState, useEffect } from "react";
import SmallUnderline from "../../components/SmallUnderline";
import { Link } from "react-router-dom";

const categories = {
  Men: [
    {
      name: "Eyeglasses",
      link: "/shop/eyeglasses",
      image: "/images/categories/eyeglasses.webp",
    },
    {
      name: "Sunglasses",
      link: "/shop/sunglasses",
      image: "/images/categories/sunglasses.webp",
    },
    {
      name: "Computer Glasses",
      link: "/shop/computer-glasses",
      image: "/images/categories/computer-glasses.webp",
    },
    {
      name: "Contact Lenses",
      link: "/shop/contact-lenses",
      image: "/images/categories/contact-lenses.webp",
    },
    // {
    //   name: "Accessories",
    //   link: "/shop/products",
    //   image: "/images/categories/accessories.webp",
    // },
  ],
  Women: [
    {
      name: "Eyeglasses",
      link: "/shop/eyeglasses",
      image: "/images/categories/eyeglasses-women.webp",
    },
    {
      name: "Sunglasses",
      link: "/shop/sunglasses",
      image: "/images/categories/sunglasses-women.webp",
    },
    {
      name: "Computer Glasses",
      link: "/shop/computer-glasses",
      image: "/images/categories/computer-glasses-women.webp",
    },
    {
      name: "Contact Lenses",
      link: "/shop/contact-lenses",
      image: "/images/categories/contact-lenses-women.webp",
    },
    // {
    //   name: "Accessories",
    //   image: "/images/categories/accessories-women.webp",
    // },
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
      <div className="max-w-6xl mx-auto pt-6 md:px-10 lg:px-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {displayedCategories.map((category, index) => (
          <Link
            to={category.link + `?gender=${activeTab}`}
            key={index}
            className="text-center"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 bg-amber-500 pt-2 rounded-full object-cover mx-auto mb-2 ease-in-out  transform transition-transform duration-300 hover:scale-105"
              loading="lazy"
              style={{ imageRendering: "auto" }}
            />
            <p className="text-lg">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
