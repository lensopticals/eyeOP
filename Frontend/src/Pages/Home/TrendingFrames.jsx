import React from "react";
import SmallUnderline from "../../components/SmallUnderline";

const data = [
  {
    id: 1,
    imageUrl: "/images/frames/Avaitor.webp",
    title: "Aviator",
  },
  {
    id: 2,
    imageUrl: "/images/frames/cateye.jpg",
    title: "CatEye",
  },
  {
    id: 3,
    imageUrl: "/images/frames/Hexa.webp",
    title: "Hexa",
  },
  {
    id: 4,
    imageUrl: "/images/frames/Round.webp",
    title: "Oval",
  },
  {
    id: 5,
    imageUrl: "/images/frames/Transparent.webp",
    title: "Transparent",
  },
  {
    id: 6,
    imageUrl: "/images/frames/Wayfarer.webp",
    title: "Wayfarer",
  },
];

const TrendingFrames = () => {
  return (
    <div className="py-10 md:py-16">
      <h1 className="relative text-center text-slate-700 font-semibold text-3xl md:text-5xl">
        Wear The Trend
        <SmallUnderline />
      </h1>
      <div className="w-full h-full pt-10 px-4 md:px-12 lg:px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full cursor-pointer hover:shadow-lg shadow-slate-700 h-full flex flex-col items-center justify-center p-2 rounded-lg border transition-shadow duration-300 ease-in-out"
          >
            <img src={item.imageUrl} alt={item.title} className="w-32 h-32" />
            <p className="text-sm font-semibold text-gray-800 mt-2">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingFrames;
