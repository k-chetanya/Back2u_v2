import { Link } from "react-router-dom";
import { FaHeart, FaRocket, FaHome, FaSearch, FaFlag, FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-black to-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600">
                <FaSearch className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Lost</span>
                <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                  Found
                </span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Reconnecting people with their lost belongings through secure, community-powered technology.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 pb-2 border-b border-gray-800">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white hover:text-cyan-300 transition-colors">
                  <FaHome className="text-sm" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white hover:text-blue-300 transition-colors">
                  <FaSearch className="text-sm" />
                  Lost Items
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white hover:text-orange-300 transition-colors">
                  <FaFlag className="text-sm" />
                  Report Item
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white hover:text-green-300 transition-colors">
                  <FaEnvelope className="text-sm" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4 pb-2 border-b border-gray-800">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 pb-2 border-b border-gray-800">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-gray-400">
                Have questions? We're here to help.
              </p>
              <p className="text-gray-400">
                Email: support@lostfound.com
              </p>
              <p className="text-gray-400">
                Response time: 24-48 hours
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} LostFound. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span className="text-gray-400">by</span>
            <span className="font-semibold text-transparent bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text">
              Chetanya
            </span>
            <FaRocket className="text-orange-400 ml-2" />
          </div>
          
          <div className="text-xs text-gray-500">
            Version 1.0.0
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;