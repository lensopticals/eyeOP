import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaInbox,
} from "react-icons/fa";
import ReviewSummary from "../../components/product/Reviews/ReviewSummary";
import ImageModal from "../../components/modals/Product/ImageModal";
import ImageSlider from "../../components/product/ImageSlider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productAction";
import { addToCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import { clearCartErrors } from "../../redux/features/cartSlice";
const ProductDetails = () => {
  const [collapse, setCollapse] = useState(true);
  const [isOpen, setisOpen] = useState(false);
  const handleImageModel = () => {
    setisOpen(!isOpen);
  };
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.productDetail);
  const { cartLoading, cartError } = useSelector((state) => state.cart);

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
    dispatch(addToCart({ productId: id, quantity }));
  };

  return (
    <>
      {loading ? (
        <h1 className="text-center text-2xl text-gray-600">Loading..</h1>
      ) : (
        <>
          {product ? (
            <>
              <ImageModal
                isOpen={isOpen}
                images={product?.images}
                setisOpen={setisOpen}
              />
              <div className="p-4 md:px-20 md:py-10 bg-gray-100 ">
                <div className="flex flex-col lg:flex-row gap-6 ">
                  <div className="w-full lg:w-1/2 h-full max-h-screen  bg-white border border-[#f0ebeb] rounded-lg relative ">
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
                  <div className="w-full lg:w-1/2 h-full rounded-lg bg-white flex flex-col gap-5 px-4 py-6">
                    <div className="head">
                      <h1 className="text-3xl text-blue-700 font-semibold">
                        Product Name
                      </h1>
                      <p className="text-slate-700 mt-1">Brand</p>
                    </div>
                    <p className="text-md font-sans text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Repellendus, sapiente earum eos a odit nulla non repellat!
                      Magni maiores quasi, quibusdam enim nesciunt fugit
                      necessitatibus eaque alias natus consequuntur quidem
                      praesentium voluptas dolore eligendi!
                      {product?.description}
                    </p>

                    <p className="text-2xl font-normal">₹ {product.price}</p>

                    <div className="quantity">
                      <h6 className="text-gray-600">Quantity</h6>
                      <select
                        onChange={(e) => setQuantity(e.target.value)}
                        className="flex items-center px-5 py-4 text-sm font-medium outline-none focus:bg-gray-200 placeholder:text-gray-500 bg-gray-50 text-gray-900 rounded-lg"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>

                    <div className="colors">
                      <h6 className="text-gray-600">Colour</h6>
                      <div className="flex !-ml-2 mt-2 ">
                        {/* Rounded Coloured Rounded Boxes */}
                        <div className="w-10 h-10 cursor-pointer rounded-full bg-blue-500"></div>
                        <div className="w-10 h-10 cursor-pointer rounded-full bg-red-500"></div>
                        <div className="w-10 h-10 cursor-pointer rounded-full bg-green-500"></div>
                        <div className="w-10 h-10 cursor-pointer rounded-full bg-yellow-500"></div>
                      </div>
                    </div>

                    <div className="size">
                      <h6 className="text-gray-600">Size</h6>
                      {/* Rounded Boxes for Size*/}
                      <div className="flex gap-5 m-2 ">
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

                    <button
                      onClick={handleCart}
                      className="py-2 hover:bg-slate-700 hover:text-white active:bg-slate-800 disabled:bg-slate-500 disabled:text-gray-100 disabled:cursor-not-allowed px-4 border w-36 shadow-sm border-slate-800"
                    >
                      {cartLoading ? "Adding..." : "Add to Cart"}
                    </button>

                    <div className="more">
                      <div
                        className="flex p-4 justify-between items-center border-b cursor-pointer hover:bg-slate-50"
                        onClick={() => setCollapse(!collapse)}
                      >
                        <h1>Specifications</h1>
                        <p>+</p>
                      </div>
                      <div
                        className={`overflow-y-hidden ${
                          collapse ? "h-[0]" : "h-[100%]"
                        } transition-all duration-400 ease-in-out`}
                      >
                        <div className={`overflow-x-auto  `}>
                          <table className="table-auto w-full">
                            <tbody>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Name
                                </td>
                                <td className="px-4 py-2">{product.name}</td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Brand
                                </td>
                                <td className="px-4 py-2">{product.brand}</td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Model Number
                                </td>
                                <td className="px-4 py-2">{product.modelNo}</td>
                              </tr>

                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Category
                                </td>
                                <td className="px-4 py-2">
                                  {product.category}
                                </td>
                              </tr>

                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Stock Unit ID
                                </td>
                                <td className="px-4 py-2">{product.skuId}</td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Product Type
                                </td>
                                <td className="px-4 py-2">
                                  {product.productType}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Gender
                                </td>
                                <td className="px-4 py-2">{product.gender}</td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Collection
                                </td>
                                <td className="px-4 py-2">
                                  {product.collection}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Frame Material
                                </td>
                                <td className="px-4 py-2">
                                  {product.frame?.material}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Frame Color
                                </td>
                                <td className="px-4 py-2">
                                  {product.frame?.color}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Frame Shape
                                </td>
                                <td className="px-4 py-2">
                                  {product.frame?.shape}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Frame Style
                                </td>
                                <td className="px-4 py-2">
                                  {product.frame?.style}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Size
                                </td>
                                <td className="px-4 py-2">
                                  {product.frame?.size}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Frame Width
                                </td>
                                <td className="px-4 py-2">
                                  {product.frame?.measurement}
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Age Group
                                </td>
                                <td className="px-4 py-2">
                                  {product.ageGroup} years
                                </td>
                              </tr>
                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Weight
                                </td>
                                <td className="px-4 py-2">
                                  {product.weight}gm
                                </td>
                              </tr>

                              <tr>
                                <td className="font-semibold px-4 py-2">
                                  Seller
                                </td>
                                <td className="px-4 py-2">{product.seller}</td>
                              </tr>
                              {/* Add other fields similarly */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-5 p-4">
                      <FaFacebook className="text-4xl  text-blue-700" />
                      <FaInstagram className="text-4xl text-pink-700" />
                      <FaTwitter className="text-4xl text-sky-600" />
                      <FaWhatsapp className="text-4xl text-green-700" />
                      <FaInbox className="text-4xl text-yellow-700" />
                    </div>
                  </div>
                </div>

                {/* ReView Sections */}

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
