// import React, { useState } from "react";
// import { FaRegCheckCircle, FaChevronRight } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { powerTypes } from "../data/powerTypes";

// const LensOption = ({
//   title,
//   description,
//   price,
//   features,
//   isSelected,
//   onClick,
//   warrantyPeriod,
//   index,
//   powerRange,
// }) => (
//   <motion.div
//     whileHover={{ scale: 1.003 }}
//     whileTap={{ scale: 0.995 }}
//     className={`cursor-pointer rounded-xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
//       isSelected
//         ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-white"
//         : "border-gray-200 hover:border-emerald-200"
//     }`}
//     onClick={onClick}
//   >
//     <div className="p-5">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//         <div className="flex-1">
//           <h4 className="text-lg font-semibold text-gray-900 flex items-center">
//             {title}
//             {isSelected && (
//               <FaRegCheckCircle className="ml-2 text-emerald-500 w-5 h-5" />
//             )}
//           </h4>
//           <p className="text-sm text-gray-600 mt-1">{description}</p>
//         </div>
//         <div className="mt-2 sm:mt-0 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
//           <span className="text-lg font-bold text-gray-900">
//             ₹{price.toLocaleString()}
//           </span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {/* Technical Specifications */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//           {warrantyPeriod && (
//             <div className="bg-gray-50 p-3 rounded-lg">
//               <div className="text-sm">
//                 <span className="font-medium text-gray-700">Warranty</span>
//                 <p className="text-gray-900 mt-1">{warrantyPeriod}</p>
//               </div>
//             </div>
//           )}
//           {index && (
//             <div className="bg-gray-50 p-3 rounded-lg">
//               <div className="text-sm">
//                 <span className="font-medium text-gray-700">Index</span>
//                 <p className="text-gray-900 mt-1">{index}</p>
//               </div>
//             </div>
//           )}
//           {powerRange && (
//             <div className="bg-gray-50 p-3 rounded-lg">
//               <div className="text-sm">
//                 <span className="font-medium text-gray-700">Power Range</span>
//                 <p className="text-gray-900 mt-1">{powerRange}</p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Features List */}
//         <div className="bg-white rounded-lg">
//           <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             {features.map((feature, idx) => (
//               <li
//                 key={idx}
//                 className="text-sm text-gray-700 flex items-center bg-gray-50 p-2 rounded-lg"
//               >
//                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
//                 {feature}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   </motion.div>
// );

// const TypeCard = ({ title, description, isSelected, onClick }) => (
//   <motion.div
//     whileHover={{ scale: 1.0019 }}
//     whileTap={{ scale: 0.991 }}
//     className={`cursor-pointer rounded-xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
//       isSelected
//         ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-white"
//         : "border-gray-200 hover:border-emerald-200"
//     }`}
//     onClick={onClick}
//   >
//     <div className="p-5">
//       <div className="flex justify-between items-center">
//         <div>
//           <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
//           <p className="text-sm text-gray-600 mt-1">{description}</p>
//         </div>
//         <FaChevronRight
//           className={`transition-transform duration-300 ${
//             isSelected
//               ? "transform rotate-90 text-emerald-500"
//               : "text-gray-400"
//           }`}
//         />
//       </div>
//     </div>
//   </motion.div>
// );

// const StepThree = ({ onComplete }) => {
//   const [selectedLensType, setSelectedLensType] = useState(null);
//   const [selectedLensOption, setSelectedLensOption] = useState(null);

//   // Transform powerTypes data into the format we need
//   const transformedLensTypes = powerTypes.map((type) => ({
//     id: type.id,
//     title: type.title,
//     description: type.description,
//     lensOptions: type.lenses.map((lens) => ({
//       id: lens.id,
//       title: lens.name,
//       price: lens.price,
//       warrantyPeriod: lens.features.warrantyPeriod,
//       index: lens.features.index,
//       powerRange: lens.features.powerRange,
//       features: [
//         lens.features.emeraldLightBlocker && "emerald Light Blocking",
//         lens.features.antiScratchCoating && "Anti-Scratch Coating",
//         lens.features.antiGlareCoating && "Anti-Glare Coating",
//         lens.features.antiReflectiveCoating && "Anti-Reflective Coating",
//       ].filter(Boolean),
//     })),
//   }));

//   const handleLensTypeSelect = (id) => {
//     setSelectedLensType((currentSelected) => {
//       if (currentSelected === id) {
//         setSelectedLensOption(null);
//         return null;
//       }
//       setSelectedLensOption(null);
//       return id;
//     });
//   };

//   const handleLensOptionSelect = (id) => {
//     setSelectedLensOption((currentSelected) =>
//       currentSelected === id ? null : id
//     );
//   };

//   const calculateTotal = () => {
//     if (!selectedLensType || !selectedLensOption) return 0;
//     const selectedType = transformedLensTypes.find(
//       (t) => t.id === selectedLensType
//     );
//     if (!selectedType) return 0;
//     const selectedOption = selectedType.lensOptions.find(
//       (o) => o.id === selectedLensOption
//     );
//     return selectedOption ? selectedOption.price : 0;
//   };

//   return (
//     // <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-6">
//     //   <div>
//     //     <h3 className="text-2xl md:text-3xl text-slate-700 text-center font-medium mb-8">
//     //       Customize Your Lenses
//     //     </h3>

//     //     {/* Lens Type Selection */}
//     //     <div className="mb-8">
//     //       <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//     //         <span className="bg-slate-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
//     //           1
//     //         </span>
//     //         Choose Lens Type
//     //       </h4>
//     //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     //         {transformedLensTypes.map((type) => (
//     //           <TypeCard
//     //             key={type.id}
//     //             title={type.title}
//     //             description={type.description}
//     //             isSelected={selectedLensType === type.id}
//     //             onClick={() => handleLensTypeSelect(type.id)}
//     //           />
//     //         ))}
//     //       </div>
//     //     </div>

//     //     {/* Lens Options Selection */}
//     //     {selectedLensType && (
//     //       <motion.div
//     //         initial={{ opacity: 0, y: 20 }}
//     //         animate={{ opacity: 1, y: 0 }}
//     //         className="mb-8"
//     //       >
//     //         <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//     //           <span className="bg-slate-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
//     //             2
//     //           </span>
//     //           Select Lens Package
//     //         </h4>
//     //         <div className="grid grid-cols-1 gap-4">
//     //           {transformedLensTypes
//     //             .find((t) => t.id === selectedLensType)
//     //             ?.lensOptions.map((option) => (
//     //               <LensOption
//     //                 key={option.id}
//     //                 {...option}
//     //                 isSelected={selectedLensOption === option.id}
//     //                 onClick={() => handleLensOptionSelect(option.id)}
//     //               />
//     //             ))}
//     //         </div>
//     //       </motion.div>
//     //     )}

//     //     {/* Total Price Calculation */}
//     //     <motion.div
//     //       initial={{ opacity: 0 }}
//     //       animate={{ opacity: 1 }}
//     //       className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-xl shadow-sm mb-6"
//     //     >
//     //       <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//     //         <span className="text-lg font-medium text-gray-900">
//     //           Total Price
//     //         </span>
//     //         <span className="text-2xl font-bold text-slate-700">
//     //           ₹{calculateTotal().toLocaleString()}
//     //         </span>
//     //       </div>
//     //     </motion.div>

//     //     {/* Navigation Buttons */}
//     //     <div className="flex justify-end items-center pt-4">
//     //       <button
//     //         onClick={onComplete}
//     //         disabled={!selectedLensType || !selectedLensOption}
//     //         className="px-8 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium shadow-sm hover:shadow-md"
//     //       >
//     //         Complete Selection
//     //       </button>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-6">
//       <div>
//         <h3 className="text-2xl md:text-3xl text-slate-700 text-center font-medium mb-8">
//           Customize Your Lenses
//         </h3>

//         {/* Lens Type Selection */}
//         <div className="mb-8">
//           <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//             <span className="bg-slate-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
//               1
//             </span>
//             Choose Lens Type
//           </h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {transformedLensTypes.map((type) => (
//               <TypeCard
//                 key={type.id}
//                 title={type.title}
//                 description={type.description}
//                 isSelected={selectedLensType === type.id}
//                 onClick={() => handleLensTypeSelect(type.id)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Lens Options Selection */}
//         {selectedLensType && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8"
//           >
//             <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//               <span className="bg-slate-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
//                 2
//               </span>
//               Select Lens Package
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {transformedLensTypes
//                 .find((t) => t.id === selectedLensType)
//                 ?.lensOptions.map((option, index, array) => (
//                   <div
//                     key={option.id}
//                     className={`${
//                       index === array.length - 1 && array.length % 2 === 1
//                         ? "md:col-span-2 md:w-1/2 md:mx-auto"
//                         : ""
//                     }`}
//                   >
//                     <LensOption
//                       {...option}
//                       isSelected={selectedLensOption === option.id}
//                       onClick={() => handleLensOptionSelect(option.id)}
//                     />
//                   </div>
//                 ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Total Price Calculation */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-xl shadow-sm mb-6"
//         >
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <span className="text-lg font-medium text-gray-900">
//               Total Price
//             </span>
//             <span className="text-2xl font-bold text-slate-700">
//               ₹{calculateTotal().toLocaleString()}
//             </span>
//           </div>
//         </motion.div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-end items-center pt-4">
//           <button
//             onClick={onComplete}
//             disabled={!selectedLensType || !selectedLensOption}
//             className="px-8 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium shadow-sm hover:shadow-md"
//           >
//             Complete Selection
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StepThree;

import React, { useState, useEffect } from "react";
import { FaRegCheckCircle, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { powerTypes } from "../data/powerTypes";

const LensOption = ({
  title,
  description,
  price,
  features,
  isSelected,
  onClick,
  warrantyPeriod,
  index,
  powerRange,
}) => (
  <motion.div
    whileHover={{ scale: 1.003 }}
    whileTap={{ scale: 0.995 }}
    className={`cursor-pointer rounded-xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
      isSelected
        ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-white"
        : "border-gray-200 hover:border-emerald-200"
    }`}
    onClick={onClick}
  >
    <div className="p-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            {title}
            {isSelected && (
              <FaRegCheckCircle className="ml-2 text-emerald-500 w-5 h-5" />
            )}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-lg font-bold text-gray-900">
            ₹{price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {warrantyPeriod && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Warranty</span>
                <p className="text-gray-900 mt-1">{warrantyPeriod}</p>
              </div>
            </div>
          )}
          {index && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Index</span>
                <p className="text-gray-900 mt-1">{index}</p>
              </div>
            </div>
          )}
          {powerRange && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Power Range</span>
                <p className="text-gray-900 mt-1">{powerRange}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-700 flex items-center bg-gray-50 p-2 rounded-lg"
              >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
);

const TypeCard = ({ title, description, isSelected, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.0019 }}
    whileTap={{ scale: 0.991 }}
    className={`cursor-pointer rounded-xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
      isSelected
        ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-white"
        : "border-gray-200 hover:border-emerald-200"
    }`}
    onClick={onClick}
  >
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <FaChevronRight
          className={`transition-transform duration-300 ${
            isSelected
              ? "transform rotate-90 text-emerald-500"
              : "text-gray-400"
          }`}
        />
      </div>
    </div>
  </motion.div>
);

const StepThree = ({
  onComplete,
  onLensCustomization,
  currentLensCustomization,
}) => {
  const [selectedLensType, setSelectedLensType] = useState(
    currentLensCustomization?.lensType?.id || null
  );
  const [selectedLensOption, setSelectedLensOption] = useState(
    currentLensCustomization?.selectedPackage?.id || null
  );

  // Transform powerTypes data into the format we need
  const transformedLensTypes = powerTypes.map((type) => ({
    id: type.id,
    title: type.title,
    description: type.description,
    lensOptions: type.lenses.map((lens) => ({
      id: lens.id,
      title: lens.name,
      price: lens.price,
      warrantyPeriod: lens.features.warrantyPeriod,
      index: lens.features.index,
      powerRange: lens.features.powerRange,
      features: [
        lens.features.blueLightBlocker && "Blue Light Blocking",
        lens.features.antiScratchCoating && "Anti-Scratch Coating",
        lens.features.antiGlareCoating && "Anti-Glare Coating",
        lens.features.antiReflectiveCoating && "Anti-Reflective Coating",
      ].filter(Boolean),
      rawFeatures: lens.features,
    })),
  }));

  const handleLensTypeSelect = (id) => {
    setSelectedLensType((currentSelected) => {
      const newSelected = currentSelected === id ? null : id;
      if (newSelected !== currentSelected) {
        setSelectedLensOption(null);
        updateLensCustomization(newSelected, null);
      }
      return newSelected;
    });
  };

  const handleLensOptionSelect = (id) => {
    setSelectedLensOption((currentSelected) => {
      const newSelected = currentSelected === id ? null : id;
      updateLensCustomization(selectedLensType, newSelected);
      return newSelected;
    });
  };

  const updateLensCustomization = (typeId, optionId) => {
    if (!typeId || !optionId) {
      onLensCustomization({
        lensType: { id: null, title: "", description: "" },
        selectedPackage: {
          id: null,
          name: "",
          price: 0,
          features: {
            warrantyPeriod: "",
            index: "",
            powerRange: "",
            blueLightBlocker: false,
            antiScratchCoating: false,
            antiGlareCoating: false,
            antiReflectiveCoating: false,
          },
        },
      });
      return;
    }

    const selectedType = transformedLensTypes.find((t) => t.id === typeId);
    const selectedOption = selectedType?.lensOptions.find(
      (o) => o.id === optionId
    );

    if (selectedType && selectedOption) {
      onLensCustomization({
        lensType: {
          id: selectedType.id,
          title: selectedType.title,
          description: selectedType.description,
        },
        selectedPackage: {
          id: selectedOption.id,
          name: selectedOption.title,
          price: selectedOption.price,
          features: {
            warrantyPeriod: selectedOption.warrantyPeriod,
            index: selectedOption.index,
            powerRange: selectedOption.powerRange,
            blueLightBlocker:
              selectedOption.rawFeatures.blueLightBlocker || false,
            antiScratchCoating:
              selectedOption.rawFeatures.antiScratchCoating || false,
            antiGlareCoating:
              selectedOption.rawFeatures.antiGlareCoating || false,
            antiReflectiveCoating:
              selectedOption.rawFeatures.antiReflectiveCoating || false,
          },
        },
      });
    }
  };

  const calculateTotal = () => {
    if (!selectedLensType || !selectedLensOption) return 0;
    const selectedType = transformedLensTypes.find(
      (t) => t.id === selectedLensType
    );
    if (!selectedType) return 0;
    const selectedOption = selectedType.lensOptions.find(
      (o) => o.id === selectedLensOption
    );
    return selectedOption ? selectedOption.price : 0;
  };

  // Restore state from currentLensCustomization if provided
  useEffect(() => {
    if (
      currentLensCustomization?.lensType?.id &&
      currentLensCustomization?.selectedPackage?.id
    ) {
      setSelectedLensType(currentLensCustomization.lensType.id);
      setSelectedLensOption(currentLensCustomization.selectedPackage.id);
    }
  }, [currentLensCustomization]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      <div>
        <h3 className="text-2xl md:text-3xl text-slate-700 text-center font-medium mb-8">
          Customize Your Lenses
        </h3>

        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="bg-slate-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
              1
            </span>
            Choose Lens Type
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transformedLensTypes.map((type) => (
              <TypeCard
                key={type.id}
                title={type.title}
                description={type.description}
                isSelected={selectedLensType === type.id}
                onClick={() => handleLensTypeSelect(type.id)}
              />
            ))}
          </div>
        </div>

        {selectedLensType && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="bg-slate-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
                2
              </span>
              Select Lens Package
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transformedLensTypes
                .find((t) => t.id === selectedLensType)
                ?.lensOptions.map((option, index, array) => (
                  <div
                    key={option.id}
                    className={`${
                      index === array.length - 1 && array.length % 2 === 1
                        ? "md:col-span-2 md:w-1/2 md:mx-auto"
                        : ""
                    }`}
                  >
                    <LensOption
                      {...option}
                      isSelected={selectedLensOption === option.id}
                      onClick={() => handleLensOptionSelect(option.id)}
                    />
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-xl shadow-sm mb-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-lg font-medium text-gray-900">
              Total Price
            </span>
            <span className="text-2xl font-bold text-slate-700">
              ₹{calculateTotal().toLocaleString()}
            </span>
          </div>
        </motion.div>

        <div className="flex justify-end items-center pt-4">
          <button
            onClick={onComplete}
            disabled={!selectedLensType || !selectedLensOption}
            className="px-8 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium shadow-sm hover:shadow-md"
          >
            Complete Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
