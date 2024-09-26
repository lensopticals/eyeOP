import React from "react";
import { LiaTimesSolid } from "react-icons/lia";

const ImageModal = ({ isOpen, setisOpen, images }) => {
  return (
    <>
      {isOpen && (
        <div className="bg-[#ffffff00]  z-50 w-screen fixed inset-0 backdrop-blur-md">
          <div className="overflow-auto w-full h-full flex flex-col justify-start items-center">
            {/* Close Btn */}
            <p
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setisOpen(false)}
            >
              <LiaTimesSolid className="text-2xl" />
            </p>
            {images.map((image, index) => {
              return (
                <div
                  key={index}
                  className="w-full lg:w-10/12 xl:w-8/12 max-h-screen"
                >
                  <img
                    src={image}
                    alt="image"
                    className="w-full object-cover border"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
