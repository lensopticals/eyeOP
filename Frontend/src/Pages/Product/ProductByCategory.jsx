import React from "react";
import { useParams } from "react-router-dom";

const ProductByCategory = () => {
  const { category } = useParams();

  return (
    <div>
      <h1 className="text-center text-slate-600 profile-text text-5xl">
        {category}
      </h1>
    </div>
  );
};

export default ProductByCategory;
