import React from 'react';
import { FaBook, FaUserInjured, FaShippingFast, FaBackspace, FaFileAlt, FaBriefcase, FaAt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary-color text-white py-8">
      {/* Grid Container */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First Section: See other books */}
          <div>
            <h5 className="text-xl font-semibold mb-4">See other books</h5>
            <ul className="space-y-3">
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaBook />
                  <span>Bestsellers</span>
                </a>
              </li>
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaBook />
                  <span>All books</span>
                </a>
              </li>
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaUserInjured />
                  <span>Our authors</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Second Section: Execution of the contract */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Execution of the contract</h5>
            <ul className="space-y-3">
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaShippingFast />
                  <span>Supply</span>
                </a>
              </li>
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaBackspace />
                  <span>Returns</span>
                </a>
              </li>
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaFileAlt />
                  <span>Regulations</span>
                </a>
              </li>
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaFileAlt />
                  <span>Privacy policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Third Section: Publishing house */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Publishing house</h5>
            <ul className="space-y-3">
              <li>
                <a href="#!" className="text-white">The BookStore</a>
              </li>
              <li>
                <a href="#!" className="text-white">123 Street</a>
              </li>
              <li>
                <a href="#!" className="text-white">05765 NY</a>
              </li>
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaBriefcase />
                  <span>Send us a book</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Fourth Section: Write to us */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Write to us</h5>
            <ul className="space-y-3">
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaAt />
                  <span>Help in purchasing</span>
                </a>
              </li>
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaShippingFast />
                  <span>Check the order status</span>
                </a>
              </li>
              <li>
                <a href="#!" className="text-white flex items-center space-x-2">
                  <FaEnvelope />
                  <span>Join the newsletter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-dark text-center py-4 mt-8">
        <p className="text-white mb-0">
          © 2021 Copyright: <a href="https://mdbootstrap.com/" className="text-white">MDBootstrap.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
