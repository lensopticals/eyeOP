import React, { useEffect } from "react";
import { toast } from "react-toastify";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-center text-5xl profile-text">Home Page</h1>
      <div className="h-screen text-4xl profile-text bg-orange-500">
        Hero Section
      </div>
      <div className="h-[40vh] text-4xl profile-text bg-gray-100">
        Coupans Etc. Section
      </div>
      <div className="h-[40vh] text-4xl profile-text bg-yellow-500">
        Shop By Category
      </div>
      <div className="h-[40vh] text-4xl profile-text bg-green-100">
        Shop By Brands
      </div>
      <div className="h-[80vh] text-4xl profile-text bg-slate-400">
        Some Intractive products
      </div>
      <div className="h-[80vh] text-4xl profile-text bg-yellow-400">
        Features
      </div>
      <div className="h-[80vh] text-4xl profile-text bg-purple-200">
        Testimonals
      </div>
    </div>
  );
};

export default HomePage;
