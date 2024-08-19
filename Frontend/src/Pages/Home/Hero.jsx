import React from "react";
import Slider from "react-slick";

const products = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dtbbuevez/image/upload/v1724004124/banner1_fga2kh.webp",
    title: "",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dtbbuevez/image/upload/v1724004125/banner5_t5xvi2.webp",

    title: "Product 2",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dtbbuevez/image/upload/v1724004123/banner2_en10qf.webp",

    title: "Product 2",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dtbbuevez/image/upload/v1724004123/banner3_vl6waf.webp",

    title: "Product 2",
  },
];

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: null,
    prevArrow: null,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
  };
  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div className=" h-full w-full" key={product.id}>
          <div className="relative">
            <div className="absolute inset-0 bg-gray-700/15 md:bg-black/30"></div>
            <h1 className="absolute left-7 md:left-28 top-1/2 text-xl md:text-[5.5rem] leading-none text-white w-1/2 font-bold -translate-y-1/2">
              Elevate Your <span className="text-[#FFD700]">Look </span> with{" "}
              <span className="text-slate-900">Premium</span> Eyewear
            </h1>
            <img
              className="w-full h-full md:h-[82vh] object-cover"
              src={product.image}
              alt={"Eyeop"}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Hero;
