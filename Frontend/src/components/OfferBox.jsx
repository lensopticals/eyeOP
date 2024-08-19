import React from "react";
import { FaTag } from "react-icons/fa";

const OfferBox = ({ offer }) => {
  return (
    <div className="border border-blue-300 rounded-lg p-4 py-2 flex items-center space-x-3">
      <FaTag className="text-blue-500 text-lg" />
      <div className="text-gray-600">
        <span className="font-medium text-blue-600">Offers</span>
        <p className="text-sm">
          Pay via PhonePe/Paytm & get Instant 100% Cashback* {"  "} *T&C apply
        </p>
      </div>
    </div>
  );
};

export default OfferBox;
