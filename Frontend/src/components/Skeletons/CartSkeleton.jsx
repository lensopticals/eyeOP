import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CartSkeleton({ className = "" }) {
  return (
    <div>
      <div
        className="w-full h-full bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden"
        id="chec-div"
      >
        <div
          className="w-full h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
          id="checkout"
        >
          <div
            className={`flex md:flex-row flex-col justify-center ${className}`}
            id="cart"
          >
            {/* Cart Items */}
            <div
              className="2xl:w-1/2 md:w-2/3 w-full md:pl-10 pl-4 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden max-h-screen"
              id="scroll"
            >
              <p className="text-5xl font-semibold leading-10 text-slate-800 pt-3">
                <Skeleton width={150} height={40} />
              </p>
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="md:flex items-center justify-between mt-5 py-5 border-t border-gray-200"
                >
                  <div className="w-1/6 h-fit md:h-28 border">
                    <Skeleton height="100%" />
                  </div>
                  <div className="md:pl-3 md:w-3/4">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                      <Skeleton width={120} />
                    </p>
                    <div className="flex items-center justify-between w-full pt-1">
                      <p className="text-base font-semibold leading-none text-gray-800">
                        <Skeleton width={180} />
                      </p>
                      <p className="text-sm font-semibold leading-3 text-gray-600 py-1">
                        <Skeleton width={50} />
                      </p>
                      <Skeleton width={50} height={30} />
                    </div>
                    <p className="text-sm leading-3 text-gray-600 py-1">
                      <Skeleton width={80} />
                    </p>
                    <div className="flex items-center justify-between pt-0 pr-6">
                      <div className="flex items-center gap-4">
                        <Skeleton width={70} />
                      </div>
                      <p className="text-base font-semibold text-gray-800">
                        <Skeleton width={60} />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="2xl:w-1/2 md:w-1/3 w-full bg-white h-full">
              <div className="flex flex-col md:h-screen px-14 py-4 md:py-20 overflow-y-auto">
                <p className="text-4xl font-semibold leading-9 text-gray-800">
                  <Skeleton width={130} height={35} />
                </p>
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pt-5"
                  >
                    <p className="text-base leading-none text-gray-800">
                      <Skeleton width={90} />
                    </p>
                    <p className="text-base leading-none text-gray-800">
                      <Skeleton width={70} />
                    </p>
                  </div>
                ))}
                <div className="flex items-center pb-6 justify-between pt-8">
                  <p className="text-2xl leading-normal text-gray-800">
                    <Skeleton width={80} />
                  </p>
                  <p className="text-2xl font-semibold leading-normal text-right text-gray-800">
                    <Skeleton width={100} />
                  </p>
                </div>
                <Skeleton height={45} width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSkeleton;
