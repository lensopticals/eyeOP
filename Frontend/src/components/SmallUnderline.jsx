import React from "react";

const SmallUnderline = ({ className }) => {
  return (
    <div
      className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-orange-500 rounded-full ${className}`}
    ></div>
  );
};

export default SmallUnderline;
