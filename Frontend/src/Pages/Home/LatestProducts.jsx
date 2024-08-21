import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productAction";
import SmallUnderline from "../../components/SmallUnderline";
import ProductCard from "../../components/ProductCard";
import { ProductCardSkeleton } from "../../components/Skeletons/ProductCardSkeleton";

const LatestProducts = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);

  useEffect(() => {
    //   if (error) {
    //     message.error(error);
    //     dispatch(clearErrors());
    //   }

    dispatch(
      getProducts({
        limit: 8,
      })
    );
  }, []);
  return (
    <div className="pb-16 px-5 md:px-10">
      <h1 className="relative mb-10 text-center font-semibold text-3xl md:text-4xl text-slate-700">
        Latest Products
        <SmallUnderline />
      </h1>
      <div className="products w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton />)
          : products &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default LatestProducts;
