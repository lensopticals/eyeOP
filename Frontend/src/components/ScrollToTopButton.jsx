import React, { useState, useEffect } from "react";
import { IoMdArrowUp } from "react-icons/io";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-button bg-sky-700 hover:bg-blue-700"
        >
          <IoMdArrowUp className="text-2xl font-bold" />
        </button>
      )}
      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 50px;
          right: 20px;
          z-index: 45;
        }
        .scroll-to-top-button {
          border: none;
          color: white;
          padding: 13px 13px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ScrollToTopButton;
