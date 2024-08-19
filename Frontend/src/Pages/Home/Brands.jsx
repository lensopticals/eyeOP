import React from "react";
import SmallUnderline from "../../components/SmallUnderline";
import Slider from "react-slick";

const data = [
  {
    id: 1,
    title: "RayBan",
    imageUrl: "/images/brands/rayban.webp",
  },
  {
    id: 2,
    title: "Diesel",
    imageUrl: "/images/brands/diesel.webp",
  },
  {
    id: 3,
    title: "Nike Vision",
    imageUrl: "/images/brands/nike.webp",
  },
  {
    id: 4,
    title: "Puma Eyeware",
    imageUrl: "/images/brands/puma.webp",
  },
  {
    id: 5,
    title: "Brendel Eyeware",
    imageUrl: "/images/brands/brendel.webp",
  },
  {
    id: 6,
    title: "Roadies",
    imageUrl: "/images/brands/roadies.webp",
  },
  {
    id: 7,
    title: "Vouge Eyeware",
    imageUrl: "/images/brands/vouge.webp",
  },
];

const BrandCard = ({ title, imageUrl }) => {
  return (
    <div className="cursor-pointer mx-5 my-10">
      <div className="flex flex-col gap-4 justify-center items-center w-full md:w-48 lg:w-60 border rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

const Brands = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="pb-10 px-4 md:px-10 lg:px-20">
      <h1 className="relative text-center text-slate-700 font-semibold text-3xl md:text-4xl">
        Explore Brands
        <SmallUnderline />
      </h1>
      <Slider {...settings} className="mt-4 md:mt-5">
        {data.map((brand) => (
          <BrandCard
            key={brand.id}
            title={brand.title}
            imageUrl={brand.imageUrl}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Brands;
