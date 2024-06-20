import React, { useState } from "react";

function Cart() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        <div
          className="w-full h-full bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden"
          id="chec-div"
        >
          <div
            className="w-full h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="checkout"
          >
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div
                className="2xl:w-1/2 md:w-2/3 w-full md:pl-10 pl-4 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden max-h-screen"
                id="scroll"
              >
                <p className="text-5xl font-black leading-10 text-slate-800 pt-3">
                  Cart
                </p>
                <div className="md:flex items-center justify-between mt-10 py-8 border-t border-gray-200">
                  <div className="w-1/6 h-1/5">
                    <img
                      src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller3.png"
                      alt
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="md:pl-3 md:w-3/4">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                      RF293
                    </p>
                    <div className="flex items-center justify-between w-full pt-1">
                      <p className="text-base font-black leading-none text-gray-800">
                        North wolf bag
                      </p>
                      <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                      </select>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 pt-2">
                      Height: 10 inches
                    </p>
                    <p className="text-xs leading-3 text-gray-600 py-4">
                      Color: Black
                    </p>
                    <p className="w-96 text-xs leading-3 text-gray-600">
                      Composition: 100% calf leather
                    </p>
                    <div className="flex items-center justify-between pt-5 pr-6">
                      <div className="flex itemms-center">
                        <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                          Add to favorites
                        </p>
                        <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                          Remove
                        </p>
                      </div>
                      <p className="text-base font-black leading-none text-gray-800">
                        $9,000
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:flex items-center justify-between mt-10 py-8 border-t border-gray-200">
                  <div className="w-1/6 h-1/5">
                    <img
                      src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller3.png"
                      alt
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="md:pl-3 md:w-3/4">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                      RF293
                    </p>
                    <div className="flex items-center justify-between w-full pt-1">
                      <p className="text-base font-black leading-none text-gray-800">
                        North wolf bag
                      </p>
                      <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                      </select>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 pt-2">
                      Height: 10 inches
                    </p>
                    <p className="text-xs leading-3 text-gray-600 py-4">
                      Color: Black
                    </p>
                    <p className="w-96 text-xs leading-3 text-gray-600">
                      Composition: 100% calf leather
                    </p>
                    <div className="flex items-center justify-between pt-5 pr-6">
                      <div className="flex itemms-center">
                        <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                          Add to favorites
                        </p>
                        <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                          Remove
                        </p>
                      </div>
                      <p className="text-base font-black leading-none text-gray-800">
                        $9,000
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:flex items-center justify-between mt-10 py-8 border-t border-gray-200">
                  <div className="w-1/6 h-1/5">
                    <img
                      src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller3.png"
                      alt
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="md:pl-3 md:w-3/4">
                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                      RF293
                    </p>
                    <div className="flex items-center justify-between w-full pt-1">
                      <p className="text-base font-black leading-none text-gray-800">
                        North wolf bag
                      </p>
                      <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                      </select>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 pt-2">
                      Height: 10 inches
                    </p>
                    <p className="text-xs leading-3 text-gray-600 py-4">
                      Color: Black
                    </p>
                    <p className="w-96 text-xs leading-3 text-gray-600">
                      Composition: 100% calf leather
                    </p>
                    <div className="flex items-center justify-between pt-5 pr-6">
                      <div className="flex itemms-center">
                        <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                          Add to favorites
                        </p>
                        <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                          Remove
                        </p>
                      </div>
                      <p className="text-base font-black leading-none text-gray-800">
                        $9,000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="2xl:w-1/2 md:w-1/3  w-full bg-white h-full">
                <div className="flex flex-col md:h-screen px-14 py-4 md:py-20 overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">
                      Summary
                    </p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base leading-none text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        $9,000
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        $30
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Tax
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        $35
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between pt-8 ">
                      <p className="text-2xl leading-normal text-gray-800">
                        Total
                      </p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                        $10,240
                      </p>
                    </div>
                    <button
                      onClick={() => setShow(!show)}
                      className="text-base leading-none w-full py-3 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
      </style>
    </>
  );
}

export default Cart;
