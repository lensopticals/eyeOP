import React from "react";
import Slider from "react-slick";

const data = [
  //   {
  //     id: 1,
  //     title: "Summer Sale",
  //     image: "/images/coupans/coupan1.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Summer Sale",
  //     image: "/images/coupans/coupan2.jpg",
  //   },
  {
    id: 3,
    title: "Summer Sale",
    image: "/images/coupans/coupan3.jpg",
  },
  {
    id: 4,
    title: "Summer Sale",
    image: "/images/coupans/coupan4.jpg",
  },
  {
    id: 5,
    title: "Summer Sale",
    image: "/images/coupans/coupan5.jpg",
  },
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`bg-red-600 ${className}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      PRev
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      Next
    </div>
  );
}

function Coupans() {
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
    <div className="slider-container rounded-lg px-4 md:px-10 pb-10">
      <Slider {...settings}>
        {data?.map((item) => (
          <div key={item.id} className="rounded-lg overflow-hidden">
            <img
              className="w-full rounded-lg shadow-md md:max-h-[50vh]"
              src={item.image}
              alt={item.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Coupans;
