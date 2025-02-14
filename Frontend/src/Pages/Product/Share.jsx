import { useState } from "react";
import { FaShareAlt, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function ShareButton({ productUrl, productName }) {
  const [isOpen, setIsOpen] = useState(false);

  const shareOptions = [
    {
      id: "facebook",
      icon: <FaFacebook className="text-2xl text-blue-700" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    },
    {
      id: "twitter",
      icon: <FaTwitter className="text-2xl text-sky-600" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productName)}`,
    },
    {
      id: "whatsapp",
      icon: <FaWhatsapp className="text-2xl text-green-700" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(productName + " " + productUrl)}`,
    },
  ];

  return (
    <div className="relative">
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition"
      >
        <FaShareAlt className="text-2xl text-gray-800" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-3">
          <p className="text-sm font-semibold text-gray-600 mb-2">Share via:</p>
          <div className="flex gap-4">
            {shareOptions.map((option) => (
              <a
                key={option.id}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                {option.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
