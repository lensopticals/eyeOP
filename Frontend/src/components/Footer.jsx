import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterSection = ({ title, links }) => (
  <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 pl-10">
    <h2 className="text-lg font-bold mb-4 text-gray-800">{title}</h2>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.to}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Shop",
      links: [
        { to: "/men", text: "Men" },
        { to: "/women", text: "Women" },
        { to: "/kids", text: "Kids" },
        { to: "/eyewear", text: "Eyewear" },
        { to: "/coupons", text: "Coupon Cards" },
      ],
    },
    {
      title: "Customer Policies",
      links: [
        { to: "/about", text: "About Us" },
        { to: "/contact", text: "Contact Us" },
        { to: "/help", text: "Help" },
        { to: "/faq", text: "FAQ" },
        { to: "/terms", text: "Terms of Use" },
        { to: "/track-orders", text: "Track Orders" },
        { to: "/privacy", text: "Privacy Policy" },
        { to: "/terms-conditions", text: "Terms & Conditions" },
      ],
    },
  ];

  const socialLinks = [
    { to: "https://facebook.com", icon: FaFacebook },
    { to: "https://twitter.com", icon: FaTwitter },
    { to: "https://instagram.com", icon: FaInstagram },
    { to: "https://youtube.com", icon: FaYoutube },
  ];

  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap -mx-4">
          {sections.map((section, index) => (
            <FooterSection key={index} {...section} />
          ))}
          <div className="w-full lg:w-2/4 mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Newsletter</h2>
            <p className="text-sm text-gray-600 mb-4">
              Stay up to date with our latest news and products.
            </p>
            <form className="flex flex-col sm:flex-row mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 mb-2 sm:mb-0 sm:mr-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600/50 rounded-md hover:bg-blue-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
            <div>
              <h2 className="text-lg font-bold mt-10 mb-4 text-gray-800">
                Connect With Us
              </h2>
              <div className="flex space-x-6">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600/70 transition-colors duration-300"
                  >
                    <link.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
