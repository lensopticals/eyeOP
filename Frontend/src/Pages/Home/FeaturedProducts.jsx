import React, { useEffect, useState } from "react";
import SmallUnderline from "../../components/SmallUnderline";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../components/ProductCard";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards, Pagination, Autoplay } from "swiper/modules";
import { ProductCardSkeleton } from "../../components/Skeletons/ProductCardSkeleton";
import API from "../../utils/API";

export const FeaturedProducts = () => {
  const [activeType, setActiveType] = useState("sunglasses");
  const [products, setProducts] = useState([]);

  const getFeaturedProducts = async ({
    keyword = "",
    price = [0, 50000],
    productType,
    limit = 6,
  }) => {
    try {
      let url = `/all-products?keyword=${keyword}&limit=${limit}&page=1&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (productType) {
        url += `&productType=${productType}`;
      }

      const { data } = await API.get(url);
      setProducts(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeaturedProducts({ productType: activeType });
  }, [activeType]);

  const handleTypeChange = (type) => {
    setActiveType(type);
  };

  return (
    <div className="w-full bg-[#2D2D2D] py-10  px-4 md:px-10 flex flex-col lg:flex-row justify-between">
      <div className="w-full lg:w-2/5 flex flex-col gap-5 justify-center items-center">
        <h1 className="text-center mb-10 text-3xl md:text-4xl lg:text-5xl font-semibold text-white relative">
          <span className="text-amber-600">Top </span> Selling Products
          <SmallUnderline className={"-bottom-5"} />
        </h1>
        <div className="flex text-sm md:text-base flex-row gap-3 md:gap-6">
          <button
            onClick={() => handleTypeChange("sunglasses")}
            className={`border-2 px-6 md:px-14 hover:bg-amber-600 hover:text-white py-1 md:py-3 font-semibold rounded-full mr-2 transition-colors ${
              activeType === "sunglasses"
                ? "bg-amber-600 text-white"
                : "bg-transparent text-white"
            }`}
          >
            Sunglasses
          </button>
          <button
            onClick={() => handleTypeChange("eyeglasses")}
            className={`border-2 px-6 md:px-14 py-1 md:py-3 hover:bg-amber-600 hover:text-white font-semibold rounded-full transition-colors ${
              activeType === "eyeglasses"
                ? "bg-amber-600 text-white"
                : "bg-transparent text-white"
            }`}
          >
            Eyeglasses
          </button>
        </div>
      </div>
      <div className="w-full lg:w-3/5 mt-5 md:mt-0">
        <Swiper
          effect={"cards"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          modules={[EffectCards, Pagination, Autoplay]}
          className="mySwiper py-10"
        >
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <SwiperSlide
                key={product._id}
                className="transform transition-transform duration-300 ease-in-out"
              >
                <ProductCard
                  className="w-60 sm:w-72 md:w-80 py-4 md:py-8 !rounded-2xl bg-white"
                  product={product}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
