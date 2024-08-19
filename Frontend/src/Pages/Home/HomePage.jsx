import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Hero from "./Hero";
import TrendingFrames from "./TrendingFrames";
import Coupans from "./Coupans";
import Categories from "./Categories";
import Brands from "./Brands";
import LatestProducts from "./LatestProducts";
import { FeaturedProducts } from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <div className="h-full text-4xl">
        <Hero />
      </div>
      <div className="h-full w-full">
        <TrendingFrames />
      </div>
      <div className="h-full">
        <Coupans />
      </div>
      <div className="h-full">
        <Categories />
      </div>
      <div className="h-full">
        <Brands />
      </div>
      <div className="h-full">
        <LatestProducts />
      </div>
      <div className="h-full">
        <FeaturedProducts />
      </div>
      {/* <div className="h-[80vh] text-4xl profile-text bg-purple-200">
        Testimonals
      </div> */}
    </div>
  );
};

export default HomePage;
