import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/20"
          : "bg-transparent"
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Sushruta Health
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="#features"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              to="#clinicians"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              For Clinicians
            </Link>
            <Link
              to="#students"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              For Students
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <button className="btn-primary">Request a Demo</button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="#features"
                className="block text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors duration-200"
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link
                to="#clinicians"
                className="block text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors duration-200"
                onClick={toggleMenu}
              >
                For Clinicians
              </Link>
              <Link
                to="#students"
                className="block text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors duration-200"
                onClick={toggleMenu}
              >
                For Students
              </Link>
              <div className="pt-3 border-t border-gray-200">
                <button className="btn-primary w-full">Request a Demo</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
