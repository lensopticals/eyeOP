import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CheckoutSkeleton = () => {
  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <Skeleton height={30} width="50%" />

      {/* Breadcrumbs */}
      <div className="mt-2 mb-6">
        <Skeleton height={20} width="50%" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-20">
        {/* Delivery Address Section */}
        <div>
          <Skeleton height={25} width="60%" />
          <Skeleton height={20} width="80%" className="mt-4" />
          <Skeleton height={20} width="70%" className="mt-2" />
          <Skeleton height={40} width="30%" className="mt-4" />
        </div>

        {/* Order Summary Section */}
        <div>
          <Skeleton height={25} width="60%" />
          <div className="mt-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <Skeleton height={80} width={80} />
                <div className="flex-1">
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="60%" className="mt-2" />
                </div>
                <Skeleton height={20} width="20%" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="mt-8">
        <Skeleton height={25} width="60%" />
        <div className="mt-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex gap-4 items-center mb-4">
              <Skeleton height={20} width={20} />
              <Skeleton height={20} width="80%" />
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Section */}
      <div className="mt-8">
        <Skeleton height={25} width="60%" />
        <div className="mt-4 space-y-2">
          <Skeleton height={20} width="40%" />
          <Skeleton height={20} width="50%" />
          <Skeleton height={20} width="30%" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-end">
        <Skeleton height={50} width="30%" />
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
