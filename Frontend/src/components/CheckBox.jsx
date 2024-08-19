import React from "react";

const CheckBox = ({ isChecked = false }) => {
  return (
    <div className="checkbox-wrapper-12">
      <div className="cbx">
        <input checked={isChecked} type="checkbox" id="cbx-12" />
        <label htmlFor="cbx-12" />
        <svg fill="none" viewBox="0 0 15 14" height={14} width={15}>
          <path d="M2 8.36364L6.23077 12L13 2" />
        </svg>
      </div>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo-12">
            <feGaussianBlur result="blur" stdDeviation={4} in="SourceGraphic" />
            <feColorMatrix
              result="goo-12"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              mode="matrix"
              in="blur"
            />
            <feBlend in2="goo-12" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default CheckBox;
