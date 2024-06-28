import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-gray-100 mt-[3rem] py-10 flex flex-wrap items-start justify-between px-4 md:px-36">
      {/* Shop */}
      <div>
        <h1 className="text-md font-bold">Shop</h1>
        <div className="flex flex-col mt-4 gap-2 text-sm text-gray-600">
          <Link>Men</Link>
          <Link>Women</Link>
          <Link>Kids</Link>
          <Link>Eyewares</Link>
          <Link>Coupan Cards</Link>
        </div>
      </div>

      {/* Customer Policies */}
      <div>
        <h1 className="text-md font-bold">Customer Policies</h1>
        <div className="flex flex-col mt-4 gap-2 text-sm text-gray-600">
          <Link>About Us</Link>
          <Link>Contact Us</Link>
          <Link>Help</Link>
          <Link>FAQ</Link>
          <Link>Terms of use</Link>
          <Link>Track Orders</Link>

          <Link>Privacy Policy</Link>
          <Link>Terms & Conditions</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
