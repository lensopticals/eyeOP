import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaInbox,
  FaChevronDown,
} from "react-icons/fa";
import ReviewSummary from "../../components/product/Reviews/ReviewSummary";
import ImageModal from "../../components/modals/Product/ImageModal";
import ImageSlider from "../../components/product/ImageSlider";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productAction";
import { addToCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import { clearCartErrors } from "../../redux/features/cartSlice";
import { openAuthModal } from "../../redux/features/modalSlice";
import { getAddress } from "../../redux/actions/addressAction";
import OfferBox from "../../components/OfferBox";
import ProductDetailsSkeleton from "../../components/Skeletons/ProductDetailsSkeleton";
import StepperModal from "../../components/StepperModal";
import Login from "../../components/modals/auth/Login";
import { loadUser } from "../../redux/actions/userActions";

const RatingStar = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 44 44"
      fill="none"
    >
      <g clipPath="url(#clip0_13624_2608)">
        <path
          d="M21.1033 2.9166C21.4701 2.17335 22.5299 2.17335 22.8967 2.9166L28.233 13.729C28.3786 14.0241 28.6602 14.2287 28.9859 14.276L40.9181 16.0099C41.7383 16.1291 42.0658 17.137 41.4723 17.7156L32.8381 26.1318C32.6024 26.3616 32.4949 26.6926 32.5505 27.017L34.5888 38.9009C34.7289 39.7178 33.8714 40.3408 33.1378 39.9551L22.4653 34.3443C22.174 34.1911 21.826 34.1911 21.5347 34.3443L10.8622 39.9551C10.1286 40.3408 9.27114 39.7178 9.41125 38.9009L11.4495 27.017C11.5051 26.6926 11.3976 26.3616 11.1619 26.1318L2.52771 17.7156C1.93419 17.137 2.2617 16.1291 3.08192 16.0099L15.0141 14.276C15.3398 14.2287 15.6214 14.0241 15.767 13.729L21.1033 2.9166Z"
          fill="#FBBF24"
        />
      </g>
      <defs>
        <clipPath id="clip0_13624_2608">
          <rect width={44} height={44} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const ProductDetails = () => {
  const [collapse, setCollapse] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const handleImageModel = () => {
    setisOpen(!isOpen);
  };
  const [isStepperOpen, setisStepperOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.productDetail);
  const { isAuthenticated } = useSelector((state) => state.user);
  const offers = [
    "Pay via PhonePe/Paytm & get Instant 100% Cashback* *T&C apply",
    "Get 50% off on your first purchase",
    "Free delivery on orders above ₹599",
  ];
  const { cartLoading, cartError, success } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductDetails({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
      dispatch(clearCartErrors());
    }
  }, [dispatch, cartError]);

  const handleCart = () => {
    if (!isAuthenticated) {
      return dispatch(openAuthModal("login"));
    }
    dispatch(addToCart({ productId: id, quantity }));
  };

  return (
    <>
      <StepperModal isOpen={isStepperOpen} setIsOpen={setisStepperOpen} />
      {loading ? (
        <ProductDetailsSkeleton />
      ) : (
        <>
          {product ? (
            <>
              <ImageModal
                isOpen={isOpen}
                images={product?.images}
                setisOpen={setisOpen}
              />
              <div className="p-2 sm:p-4 md:px-[4.5rem] md:py-10 bg-white ">
                <div className="grid grid-cols-1 border-b border-gray-300 lg:grid-cols-2 gap-1 md:gap-6 ">
                  <div className="w-full h-full max-h-[80vh] lg:max-h-screen  bg-white rounded-lg relative ">
                    <div className="relative md:border ">
                      {product && Array.isArray(product?.images) && (
                        <ImageSlider
                          setisOpen={setisOpen}
                          images={product?.images}
                        />
                      )}
                      {product && product?.stock > 0 ? (
                        <p className="absolute top-0 right-0 p-3 bg-emerald-100 text-emerald-600">
                          In Stock
                        </p>
                      ) : (
                        <p className="absolute top-0 right-0 p-3 bg-red-50 text-red-600">
                          Out of Stock
                        </p>
                      )}
                    </div>
                    <div
                      className="hidden lg:flex mt-7 p-4 justify-between items-center border-b border-gray-300  cursor-pointer bg-slate-50 hover:bg-slate-100"
                      onClick={() => setCollapse(!collapse)}
                    >
                      <h1>Specifications</h1>
                      <button
                        className={`mt-2 focus:outline-none ${
                          !collapse && "rotate-180"
                        } transition-all duration-150 ease-in-out`}
                      >
                        <FaChevronDown className="text-emerald-600" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-full rounded-lg bg-white flex flex-col gap-3 px-2 sm:px-4 pt-0 pb-6">
                    <div className="head">
                      <h1 className="text-2xl text-slate-800 font-semibold">
                        {product?.name}
                      </h1>
                      <p className="text-slate-700 mt-1">{product?.brand}</p>
                    </div>

                    <p className="text-2xl text-emerald-600 font-semibold">
                      <span className="mr-[2px]">₹</span>
                      {product.price}
                      <span className="text-gray-500 font-normal text-lg ml-3 line-through">
                        ₹
                        {(
                          product.price +
                          (product?.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </span>
                    </p>
                    <div className="flex gap-5 items-center justify-between">
                      <h5 className="flex items-center relative button">
                        <span className="text-green-600 font-medium text-xs bg-green-100 rounded-full px-4 py-1">
                          <span className="text-sm">
                            {product.discountPercentage}
                          </span>
                          % OFF
                        </span>
                      </h5>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex">
                        {Array.from({
                          length: Math.round(product?.rating),
                        }).map((_, index) => (
                          <RatingStar key={index} />
                        ))}
                      </div>
                      <h3 className="font-semibold text-green-700">
                        {" "}
                        {product?.rating ?? "No"} Rating
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row justify-between sm:items-end">
                      <div className="colors">
                        <h6 className="text-gray-600 font-semibold">Color</h6>
                        <div className="flex !-ml-2 mt-2 ">
                          {/* Rounded Coloured Rounded Boxes */}
                          {product?.frame?.color?.map((color, i) => (
                            <div
                              className={`w-8 border p-0.5 border-slate-800 h-8 cursor-pointer rounded-full `}
                              style={{ backgroundColor: color.colorCode }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="size">
                        <h6 className="text-gray-600 font-semibold">Size</h6>
                        {/* Rounded Boxes for Size*/}
                        <div className="flex gap-5">
                          <div className="w-10 h-10 cursor-pointer flex justify-center items-center border rounded-full">
                            S
                          </div>
                          <div className="w-10 cursor-pointer h-10 flex justify-center items-center border  rounded-full">
                            M
                          </div>
                          <div className="w-10 cursor-pointer h-10 flex justify-center items-center border  rounded-full">
                            L
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Offers */}

                    <div>
                      <OfferBox offers={offers} />
                    </div>
                    {/* Frame Dimensions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-between bg-gray-700 rounded-lg border border-gray-100 shadow-xl px-0 sm:px-5 py-4 pb-7 my-2">
                      <div className="flex flex-col gap-0 items-center justify-center">
                        <img
                          src="/images/dimensions/eye.svg"
                          className="sm:w-20 sm:h-16 w-16 h-10"
                          alt=""
                        />
                        <div className="flex flex-col gap-1 justify-center items-center text-xs font-semibold sm:text-sm text-white">
                          <h5 className="text-xs md:text-sm font-normal">
                            {product?.frame?.dimensions?.lensWidth}
                          </h5>
                          <h5>Lens Width</h5>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0 items-center justify-center">
                        <img
                          src="/images/dimensions/bridge.svg"
                          className="sm:w-20 sm:h-16 w-16 h-10"
                          alt=""
                        />
                        <div className="flex flex-col gap-1 justify-center items-center text-xs font-semibold sm:text-sm text-white">
                          <h5 className="text-xs md:text-sm font-normal">
                            {product?.frame?.dimensions?.bridgeWidth}
                          </h5>
                          <h5>Bridge Width</h5>
                        </div>
                      </div>{" "}
                      <div className="flex flex-col gap-0 items-center justify-center">
                        <img
                          src="/images/dimensions/temple.svg"
                          className="sm:w-20 sm:h-16 w-16 h-10"
                          alt=""
                        />
                        <div className="flex flex-col gap-1 justify-center items-center text-xs font-semibold sm:text-sm text-white">
                          <h5 className="text-xs md:text-sm font-normal">
                            {product?.frame?.dimensions?.templeLength}
                          </h5>
                          <h5>Temple Length</h5>
                        </div>
                      </div>{" "}
                      <div className="flex flex-col gap-0 items-center justify-center">
                        <img
                          src="/images/dimensions/lens.svg"
                          className="sm:w-20 sm:h-16 w-16 h-10"
                          alt=""
                        />
                        <div className="flex flex-col gap-1 justify-center items-center text-xs font-semibold sm:text-sm text-white">
                          <h5 className="text-xs md:text-sm font-normal">
                            {product?.frame?.dimensions?.lensHeight}
                          </h5>
                          <h5>Lens Height</h5>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="fixed md:static w-full bg-white px-2 py-2 pt-4 md:pt-0 md:py-0 border border-emerald-100 md:border-none md:shadow-none md:bg-transparent rounded-md shadow-md left-0 bottom-0 z-10 flex flex-row gap-5 font-semibold">
                      <button
                        disabled={cartLoading}
                        onClick={handleCart}
                        className="py-3 hover:bg-slate-700 hover:text-white active:bg-slate-800 disabled:bg-slate-500 disabled:text-gray-100 disabled:cursor-not-allowed px-4 border w-full text-base font-semibold md:text-lg shadow-sm border-slate-800"
                      >
                        {cartLoading
                          ? "Loading..."
                          : `  Buy Frame at ₹${product?.price}`}
                      </button>

                      <button
                        // disabled
                        // onClick={handleBuy}
                        onClick={() => {
                          if (isAuthenticated) {
                            setisStepperOpen(true);
                          } else {
                            dispatch(openAuthModal("login"));
                          }
                        }}
                        className="py-3 bg-slate-700 text-white active:bg-slate-800 disabled:bg-slate-500 disabled:text-gray-100 disabled:cursor-not-allowed px-4 border w-full font-semibold text-base md:text-lg shadow-sm border-slate-800 hover:bg-slate-600 "
                      >
                        Select Lenses{" "}
                        <span className="hidden md:inline">& Buy now</span>
                      </button>
                    </div>

                    <div className="flex gap-5 p-4">
                      <FaFacebook className="text-4xl  text-blue-700" />
                      <FaInstagram className="text-4xl text-pink-700" />
                      <FaTwitter className="text-4xl text-sky-600" />
                      <FaWhatsapp className="text-4xl text-green-700" />
                    </div>
                  </div>
                  <div
                    className="flex lg:hidden p-4 justify-between items-center border-b border-gray-300  cursor-pointer bg-slate-50 hover:bg-slate-100"
                    onClick={() => setCollapse(!collapse)}
                  >
                    <h1>Specifications</h1>
                    <button
                      className={`mt-2 focus:outline-none ${
                        !collapse && "rotate-180"
                      } transition-all duration-150 ease-in-out`}
                    >
                      <FaChevronDown className="text-emerald-600" />
                    </button>
                  </div>
                </div>

                {/* ReView Sections */}
                <div className="more">
                  {/* <div
                    className={`overflow-y-hidden ${
                      collapse ? "h-[0]" : "h-[100%]"
                    } transition-all duration-400 ease-in-out`}
                  >
                    <div className="text-md font-sans text-black p-4">
                      <h3 className="py-2 font-semibold">Description</h3>
                      <p>{product?.description}</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                          <tr className="hover:bg-gray-100 border-b border-gray-300  table-row">
                            <td className="font-semibold px-4 py-2">Name</td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.name}
                            </td>
                            <td className="font-semibold px-4 py-2 table-cell">
                              Brand
                            </td>
                            <td className="px-4 py-2">{product.brand}</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300  table-row">
                            <td className="font-semibold px-4 py-2">
                              Model Number
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.modelNo}
                            </td>
                            <td className="font-semibold px-4 py-2 table-cell">
                              Category
                            </td>
                            <td className="px-4 py-2">{product.category}</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300  table-row">
                            <td className="font-semibold px-4 py-2">
                              Stock Unit ID
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.skuId}
                            </td>
                            <td className="font-semibold px-4 py-2 table-cell">
                              Product Type
                            </td>
                            <td className="px-4 py-2">{product.productType}</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300  table-row">
                            <td className="font-semibold px-4 py-2">Gender</td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.gender}
                            </td>
                            <td className="font-semibold px-4 py-2 table-cell">
                              Collection
                            </td>
                            <td className="px-4 py-2">{product.collection}</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300  table-row">
                            <td className="font-semibold px-4 py-2">
                              Frame Material
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.frame?.material}
                            </td>
                            <td className="font-semibold px-4 py-2 table-cell">
                              Frame Color
                            </td>
                            <td className="px-4 py-2">
                              {product.frame?.color?.name}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300  table-row">
                            <td className="font-semibold px-4 py-2">
                              Frame Shape
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.frame?.shape}
                            </td>
                            <td className="font-semibold px-4 py-2 table-cell">
                              Frame Style
                            </td>
                            <td className="px-4 py-2">
                              {product.frame?.style}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300  table-row">
                            <td className="font-semibold px-4 py-2">Size</td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.frame?.size}
                            </td>
                            <td className="font-semibold px-4 py-2 table-cell">
                              Frame Width
                            </td>
                            <td className="px-4 py-2">
                              {product.frame?.measurement}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300  table-row">
                            <td className="font-semibold px-4 py-2">
                              Age Group
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.ageGroup} years
                            </td>
                            <td className="font-semibold px-4 py-2 table-cell">
                              Weight
                            </td>
                            <td className="px-4 py-2">{product.weight}gm</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300  table-row">
                            <td className="font-semibold px-4 py-2">Seller</td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.seller}
                            </td>
                            <td className="font-semibold px-4 py-2 table-cell"></td>
                            <td className="px-4 py-2"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div> */}

                  <div
                    className={`overflow-y-hidden ${
                      collapse ? "h-[0]" : "h-[100%]"
                    } transition-all duration-400 ease-in-out`}
                  >
                    <div className="text-md font-sans text-black p-4">
                      <h3 className="py-2 font-semibold">Description</h3>
                      <p> {product?.description}</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                          <tr className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="font-semibold px-4 py-2">Name</td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.name}
                            </td>
                            <td className="font-semibold px-4 py-2">Brand</td>
                            <td className="px-4 py-2">{product.brand}</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="font-semibold px-4 py-2">
                              Model Number
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.modelNo}
                            </td>
                            <td className="font-semibold px-4 py-2">
                              Category
                            </td>
                            <td className="px-4 py-2">{product.category}</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="font-semibold px-4 py-2">
                              Stock Unit ID
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.skuId}
                            </td>
                            <td className="font-semibold px-4 py-2">
                              Product Type
                            </td>
                            <td className="px-4 py-2">{product.productType}</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="font-semibold px-4 py-2">Gender</td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.gender}
                            </td>
                            <td className="font-semibold px-4 py-2">
                              Collection
                            </td>
                            <td className="px-4 py-2">{product.collection}</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="font-semibold px-4 py-2">
                              Frame Material
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.frame?.material}
                            </td>
                            <td className="font-semibold px-4 py-2">
                              Frame Color
                            </td>
                            <td className="px-4 py-2">
                              {product.frame?.color?.name}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="font-semibold px-4 py-2">
                              Frame Shape
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.frame?.shape}
                            </td>
                            <td className="font-semibold px-4 py-2">
                              Frame Style
                            </td>
                            <td className="px-4 py-2">
                              {product.frame?.style}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="font-semibold px-4 py-2">Size</td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.frame?.size}
                            </td>
                            <td className="font-semibold px-4 py-2">
                              Frame Width
                            </td>
                            <td className="px-4 py-2">
                              {product.frame?.measurement}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="font-semibold px-4 py-2">
                              Age Group
                            </td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.ageGroup} years
                            </td>
                            <td className="font-semibold px-4 py-2">Weight</td>
                            <td className="px-4 py-2">{product.weight}gm</td>
                          </tr>
                          <tr className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="font-semibold px-4 py-2">Seller</td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              {product.seller}
                            </td>
                            <td className="font-semibold px-4 py-2"></td>
                            <td className="px-4 py-2"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div>
                  <ReviewSummary />
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-center text-xl">Product Not Found</h1>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
