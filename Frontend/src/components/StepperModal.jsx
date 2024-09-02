import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import CheckBox from "./CheckBox"; // Assuming CheckBox is a separate component
import { powerTypes } from "../data/powerTypes";

const StepperModal = ({ isOpen, setIsOpen }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [selected, setSelected] = useState(null); // State for selected power type

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll when modal is open
    } else {
      document.body.style.overflow = "auto"; // Allow background scroll when modal is closed
    }
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full h-full p-4 overflow-auto rounded-md shadow-lg">
            {/* Close Button */}
            <div className="sticky top-0 bg-white">
              <div className="flex justify-end items-center mb-4">
                <button onClick={closeModal}>
                  <LiaTimesSolid
                    className="text-gray-600 hover:text-red-500"
                    size={25}
                  />
                </button>
              </div>

              {/* Stepper Content */}
              <div className="border-b mb-4">
                <ul className="flex justify-between text-sm font-medium">
                  <li
                    className={`flex-1 text-center ${
                      currentStep === 1 &&
                      "text-emerald-600 bg-emerald-100 rounded py-1"
                    }`}
                  >
                    Select Frame
                  </li>
                  <li
                    className={`flex-1 text-center ${
                      currentStep === 2 &&
                      "text-emerald-600 bg-emerald-100 rounded py-1"
                    }`}
                  >
                    Select Power Type
                  </li>
                  <li
                    className={`flex-1 text-center ${
                      currentStep === 3 &&
                      "text-emerald-600 bg-emerald-100 rounded py-1"
                    }`}
                  >
                    Select Lenses
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl text-center font-medium mb-2">
                  Choose Frame Type
                </h3>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={prevStep}
                    className="px-4 invisible py-2 bg-gray-300 rounded"
                  ></button>
                  <button
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="mb-4 px-4 md:px-10 lg:px-20 flex flex-col justify-center">
                <h3 className="text-2xl md:text-4xl text-slate-700 text-center font-medium mb-2">
                  Select Power Type
                </h3>
                <div className="space-y-4 w-full max-w-2xl mx-auto">
                  {powerTypes.map((item) => (
                    <div
                      className={`addressCard p-3 mt-5 rounded-md border-2 ${
                        selected === item.id
                          ? "bg-blue-100 border-blue-500"
                          : "bg-white border-slate-200"
                      }`}
                      key={item.id}
                      onClick={() => {
                        setSelected(item.id);
                      }}
                    >
                      <div className="flex items-center">
                        <div className="w-20 h-20 mr-4">
                          <img
                            className="w-full h-full"
                            src={item.imageUrl}
                            alt={item.title}
                          />
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                          <h2 className="text-xl text-slate-700">
                            {item.title}
                          </h2>
                          <p className="text-sm text-slate-600">
                            {item.description}
                          </p>
                        </div>
                        {selected === item.id ? (
                          <div className="circle bg-transparent ml-auto w-6 h-6">
                            <CheckBox isChecked={true} />
                          </div>
                        ) : (
                          <div className="circle bg-transparent ml-auto w-6 h-6">
                            <CheckBox />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={nextStep}
                    className="px-4 py-3 min-w-36 rounded bg-slate-700 text-white disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!selected}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Select Your Lenses</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Lens options */}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Complete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StepperModal;
