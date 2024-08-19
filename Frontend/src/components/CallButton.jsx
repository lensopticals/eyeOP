import React from "react";
import { IoCallSharp } from "react-icons/io5";

const CallButton = () => {
  return (
    <div className="fixed bottom-10 left-10 z-40">
      <div className="shadow-lg shadow-sky-600 flex items-center justify-center w-14 h-14 rounded-full bg-sky-700 animate-bounce-up-and-down">
        <a
          href="tel:+9196907833"
          className="flex items-center justify-center w-full h-full"
        >
          <IoCallSharp className="text-white text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default CallButton;
