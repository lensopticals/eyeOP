import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Slider Skeleton */}
        <div className="w-full lg:w-2/5">
          <Skeleton height={400} />
        </div>

        {/* Product Info Skeleton */}
        <div className="w-full lg:w-3/5">
          <Skeleton height={40} width="60%" />
          <div className="mt-2">
            <Skeleton height={20} width="40%" />
          </div>
          <div className="mt-4">
            <Skeleton height={20} width="80%" />
          </div>
          <div className="mt-6">
            <Skeleton height={15} count={3} />
          </div>

          {/* Offers Section Skeleton */}
          <div className="mt-8">
            <Skeleton height={20} width="50%" />
            <div className="mt-2">
              <Skeleton height={15} width="70%" />
            </div>
          </div>

          {/* Frame Dimensions Section Skeleton */}
          <div className="mt-8">
            <Skeleton height={20} width="50%" />
            <div className="mt-2">
              <Skeleton height={15} width="70%" />
            </div>
          </div>

          {/* Purchase Options Skeleton */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Skeleton height={50} width="100%" />
            <Skeleton height={50} width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
