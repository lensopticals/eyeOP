// // import React, { useState, useEffect } from "react";
// // import { FaTimes } from "react-icons/fa";
// // import { LiaTimesSolid } from "react-icons/lia";
// // import CheckBox from "./CheckBox"; // Assuming CheckBox is a separate component
// // import { powerTypes } from "../data/powerTypes";
// // import StepThree from "./StepThree";

// // const StepperModal = ({ isOpen, setIsOpen }) => {
// //   const [currentStep, setCurrentStep] = useState(2);
// //   const [selected, setSelected] = useState(null); // State for selected power type

// //   const openModal = () => setIsOpen(true);
// //   const closeModal = () => setIsOpen(false);

// //   useEffect(() => {
// //     if (isOpen) {
// //       document.body.style.overflow = "hidden"; // Prevent background scroll when modal is open
// //     } else {
// //       document.body.style.overflow = "auto"; // Allow background scroll when modal is closed
// //     }
// //     return () => {
// //       document.body.style.overflow = "auto"; // Reset on unmount
// //     };
// //   }, [isOpen]);

// //   return (
// //     <>
// //       {isOpen && (
// //         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
// //           <div className="bg-white w-full h-full p-4 overflow-auto rounded-md shadow-lg">
// //             {/* Close Button */}
// //             <div className="sticky top-0 bg-white">
// //               <div className="flex justify-end items-center mb-4">
// //                 <button onClick={closeModal}>
// //                   <LiaTimesSolid
// //                     className="text-gray-600 hover:text-red-500"
// //                     size={25}
// //                   />
// //                 </button>
// //               </div>

// //               <div>
// //                 <h3 className="text-lg font-medium mb-2">Select Your Lenses</h3>
// //                 <div className="">
// //                   {/* Lens options */}
// //                   <StepThree onComplete={closeModal} />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default StepperModal;

// import React, { useState, useEffect } from "react";
// import { LiaTimesSolid } from "react-icons/lia";
// import { motion, AnimatePresence } from "framer-motion";
// import StepThree from "./StepThree";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCartErrors } from "../redux/features/cartSlice";
// import { addToCart } from "../redux/actions/cartActions";
// import { openAuthModal } from "../redux/features/modalSlice";

// const StepperModal = ({ isOpen, setIsOpen }) => {
//   const [currentStep, setCurrentStep] = useState(3);

//   const dispatch = useDispatch();
//   const { product, loading } = useSelector((state) => state.productDetail);
//   const { isAuthenticated } = useSelector((state) => state.user);
//   const { cartLoading, cartError, success } = useSelector(
//     (state) => state.cart
//   );

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isOpen]);

//   // Animation variants
//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//   };

//   const modalVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.95,
//       y: 20,
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 25,
//         stiffness: 300,
//       },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.95,
//       y: 20,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   useEffect(() => {
//     if (cartError) {
//       toast.error(cartError);
//       dispatch(clearCartErrors());
//     }
//   }, [dispatch, cartError]);

//   const handleCart = () => {
//     if (!isAuthenticated) {
//       return dispatch(openAuthModal("login"));
//     }
//     dispatch(addToCart({ productId: id, quantity }));
//     closeModal();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           variants={overlayVariants}
//           className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
//         >
//           <motion.div
//             variants={modalVariants}
//             className="bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative"
//           >
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
//               <div className="px-6 py-4 flex justify-between items-center">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900">
//                     Select Your Lenses
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Step {currentStep} of 3
//                   </p>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={closeModal}
//                   className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <LiaTimesSolid
//                     className="text-gray-600 hover:text-red-500 transition-colors"
//                     size={24}
//                   />
//                 </motion.button>
//               </div>

//               {/* Progress bar */}
//               <div className="h-1 w-full bg-gray-100">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${(currentStep / 3) * 100}%` }}
//                   className="h-full bg-emerald-500"
//                   transition={{ duration: 0.5, ease: "easeInOut" }}
//                 />
//               </div>
//             </div>

//             {/* Content area with custom scrollbar */}
//             <div className="overflow-auto max-h-[calc(90vh-80px)] custom-scrollbar">
//               <div className="relative">
//                 <StepThree onComplete={handleCart} />
//               </div>
//             </div>
//           </motion.div>

//           {/* Add custom scrollbar styles */}
//           <style jsx global>{`
//             .custom-scrollbar::-webkit-scrollbar {
//               width: 8px;
//             }
//             .custom-scrollbar::-webkit-scrollbar-track {
//               background: #f1f1f1;
//             }
//             .custom-scrollbar::-webkit-scrollbar-thumb {
//               background: #d1d5db;
//               border-radius: 4px;
//             }
//             .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//               background: #9ca3af;
//             }
//           `}</style>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default StepperModal;

import React, { useState, useEffect } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearCartErrors } from "../redux/features/cartSlice";
import { addToCart } from "../redux/actions/cartActions";
import { openAuthModal } from "../redux/features/modalSlice";
import { toast } from "react-toastify";
import StepThree from "./StepThree";

const StepperModal = ({ isOpen, setIsOpen, productId }) => {
  const [currentStep, setCurrentStep] = useState(3);
  const [lensCustomization, setLensCustomization] = useState({
    lensType: {
      id: null,
      title: "",
      description: "",
    },
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

  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetail);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartError } = useSelector((state) => state.cart);

  const closeModal = () => {
    setIsOpen(false);
    // Reset lens customization when modal closes
    setLensCustomization({
      lensType: {
        id: null,
        title: "",
        description: "",
      },
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
  };

  // Handle lens customization updates from StepThree
  const handleLensCustomization = (data) => {
    setLensCustomization(data);
  };

  const handleCart = () => {
    if (!isAuthenticated) {
      return dispatch(openAuthModal("login"));
    }

    // Validate lens customization data
    if (
      !lensCustomization.lensType.id ||
      !lensCustomization.selectedPackage.id
    ) {
      toast.error("Please complete lens selection");
      return;
    }

    // Prepare cart data
    const cartData = {
      productId,
      quantity: 1, // Default to 1 for lens customization
      purchaseType: "FRAME_WITH_LENS",
      lensCustomization: {
        lensType: {
          id: lensCustomization.lensType.id,
          title: lensCustomization.lensType.title,
          description: lensCustomization.lensType.description,
        },
        selectedPackage: {
          id: lensCustomization.selectedPackage.id,
          name: lensCustomization.selectedPackage.name,
          price: lensCustomization.selectedPackage.price,
          features: { ...lensCustomization.selectedPackage.features },
        },
      },
    };

    dispatch(addToCart(cartData));
    closeModal();
  };

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
      dispatch(clearCartErrors());
    }
  }, [dispatch, cartError]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
        >
          <motion.div
            variants={modalVariants}
            className="bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative"
          >
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
              <div className="px-6 py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Select Your Lenses
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Step {currentStep} of 3
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <LiaTimesSolid
                    className="text-gray-600 hover:text-red-500 transition-colors"
                    size={24}
                  />
                </motion.button>
              </div>

              <div className="h-1 w-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / 3) * 100}%` }}
                  className="h-full bg-emerald-500"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="overflow-auto max-h-[calc(90vh-80px)] custom-scrollbar">
              <div className="relative">
                <StepThree
                  onComplete={handleCart}
                  onLensCustomization={handleLensCustomization}
                  currentLensCustomization={lensCustomization}
                />
              </div>
            </div>
          </motion.div>

          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #9ca3af;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StepperModal;
