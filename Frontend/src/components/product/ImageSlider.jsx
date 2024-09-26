import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

const ImageSlider = ({ setisOpen, images }) => {
  useEffect(() => {
    const glide = new Glide(".glide", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      hoverpause: true,
    });

    glide.on(["mount.after", "run"], () => {
      const activeIndex = glide.index;
      const bullets = document.querySelectorAll(".glide__bullet");
      bullets.forEach((bullet, index) => {
        bullet.classList.toggle("bg-white", index === activeIndex);
      });
    });

    glide.mount();

    return () => {
      glide.destroy();
    };
  }, []);

  return (
    <div className="glide">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides" onClick={() => setisOpen(true)}>
          {images.map((image, index) => (
            <li className="glide__slide" key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="object-contain !mix-blend-screen lg:px-14 w-full h-[45vh] md:h-[60vh] lg:h-[37rem] aspect-square lg:aspect-video"
              />
            </li>
          ))}
        </ul>
      </div>
      {/* Controls */}
      <div
        className="hidden absolute left-0 md:flex items-center justify-between w-full h-0 px-2 top-1/2 "
        data-glide-el="controls"
      >
        <button
          className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
          data-glide-dir="<"
          aria-label="prev slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <title>prev slide</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </button>
        <button
          className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
          data-glide-dir=">"
          aria-label="next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <title>next slide</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>

      <div className="glide__bullets" data-glide-el="controls[nav]">
        {images.map((_, index) => (
          <button
            key={index}
            className={`glide__bullet border bg-gray-200 w-7 h-1 rounded inline-block mx-1 focus:outline-none `}
            data-glide-dir={`=${index}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
