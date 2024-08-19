import React, { useState } from "react";
import { FaTag } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const OfferBox = ({ offers }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-emerald-300 rounded-lg p-4 py-2">
      <div className="flex items-start space-x-3">
        <div className="text-gray-900 flex-1" onClick={toggleExpand}>
          <span className="font-medium text-emerald-600 text-lg">
            Availabe Offers
          </span>
          <div className=" mt-3 mb-1 flex w-full gap-2 items-center text-gray-900">
            <FaTag className="text-emerald-600 text-base w-8 md:w-fit md:text-lg" />
            <p className="text-sm">{offers[0]}</p>
          </div>
        </div>
        <button
          onClick={toggleExpand}
          className={`mt-2 focus:outline-none ${
            isExpanded && "rotate-180"
          } transition-all duration-150 ease-in-out`}
        >
          <FaChevronDown className="text-emerald-600" />
        </button>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        {isExpanded && (
          <div className="mt-1 space-y-2">
            {offers.slice(1).map((offer, index) => (
              <div className=" flex gap-2 items-center text-gray-900">
                <FaTag className="text-emerald-600 text-base md:text-lg" />
                <p className="text-sm">{offer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferBox;
