import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProductCardSkeleton = ({ className }) => {
  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
      <div
        className={`relative border overflow-hidden border-slate-200 mt-3 bg-gray-00 h-fit rounded-[0.4rem] ${className}`}
      >
        <div className="absolute z-0 px-3 flex justify-between items-end top-3 left-0 w-full py-1">
          <Skeleton width={80} height={24} />
          <Skeleton circle={true} width={20} height={20} />
        </div>
        <div className="p-3 pt-7 pb-0 bg-gray-50 flex items-center justify-center">
          <Skeleton height={160} width="100%" />
        </div>
        <div className="specs px-3 py-4">
          <Skeleton height={20} width="60%" />
          <Skeleton height={16} width="40%" style={{ marginTop: "0.5rem" }} />
          <div className="flex gap-5 items-center justify-between mt-1">
            <Skeleton height={20} width="30%" />
            <Skeleton height={20} width="25%" />
          </div>
        </div>
        <div className="relative overflow-hidden text-sm px-5 py-1">
          <Skeleton height={20} width="100%" />
        </div>
      </div>
    </SkeletonTheme>
  );
};
