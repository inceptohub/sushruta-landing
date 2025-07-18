import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-max">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-4 sm:px-6 lg:px-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-semibold text-white">
                Sushruta Health
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering medical professionals and students with intelligent
              clinical support for better patient care and enhanced learning.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-sushruta-blue-400" />
                <span className="text-sm">contact@sushrutahealth.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-sushruta-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-sushruta-blue-400" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Product</h3>
            <div className="space-y-3">
              <Link
                to="#features"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                to="#clinicians"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                For Clinicians
              </Link>
              <Link
                to="#students"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                For Students
              </Link>
              <Link
                to="/pricing"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Pricing
              </Link>
              <Link
                to="/integrations"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Integrations
              </Link>
              <Link
                to="/api"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                API Documentation
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <div className="space-y-3">
              <Link
                to="/about"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                to="/careers"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                to="/blog"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Blog
              </Link>
              <Link
                to="/press"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Press
              </Link>
              <Link
                to="/investors"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Investors
              </Link>
            </div>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-semibold mb-6">Legal & Support</h3>
            <div className="space-y-3">
              <Link
                to="/privacy"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/security"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Security
              </Link>
              <Link
                to="/compliance"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                HIPAA Compliance
              </Link>
              <Link
                to="/support"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Support Center
              </Link>
              <Link
                to="/status"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                System Status
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 Sushruta Health. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://linkedin.com/company/sushrutahealth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="https://twitter.com/sushrutahealth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="https://youtube.com/@sushrutahealth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
              >
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="https://facebook.com/sushrutahealth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm max-w-3xl mx-auto">
              Sushruta Health is designed to assist medical professionals and
              students. It is not intended to replace professional medical
              judgment or clinical decision-making. Always consult with
              qualified healthcare providers for patient care decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
