"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaGraduationCap,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { throttle } from "lodash";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 200); // Throttle the scroll event to fire every 200ms

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <div
        className={`fixed bg_blur w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg"
            : ""
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-white flex items-center">
                <FaGraduationCap className="mr-2" />
                UEMS
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#benefits">Benefits</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
            <div className="hidden md:flex space-x-3">
              <ActionButton
                href="/login"
                bgColor="bg-blue-600"
                hoverColor="hover:bg-blue-700"
              >
                Log In
              </ActionButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4">
              <NavLink href="#features" mobile>
                Features
              </NavLink>
              <NavLink href="#benefits" mobile>
                Benefits
              </NavLink>
              <NavLink href="#pricing" mobile>
                Pricing
              </NavLink>
              <NavLink href="#contact" mobile>
                Contact
              </NavLink>
              <div className="mt-4 space-y-2">
                <ActionButton
                  href="/login"
                  bgColor="bg-blue-600"
                  hoverColor="hover:bg-blue-700"
                  fullWidth
                >
                  Log In
                </ActionButton>
              </div>
            </div>
          </div>
        )}
      </div>

  );
};

// NavLink Component
const NavLink = ({ href, children, mobile }) => (
  <Link href={href} className={`${mobile ? "block text-xl py-2 text-center" : "text-white font-semibold hover:text-gray-300"}`}>
    {children}
  </Link>
);

// ActionButton Component
const ActionButton = ({ href, children, bgColor, hoverColor, fullWidth }) => (
  <Link href={href} className={`${bgColor} ${hoverColor} text-white px-4 py-2 rounded-md font-semibold ${fullWidth ? "w-full block text-center" : ""}`}>
    {children}
  </Link>
);


export default Header;
