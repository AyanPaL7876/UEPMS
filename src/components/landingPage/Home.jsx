"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaGraduationCap,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { throttle } from "lodash"; // Import throttle from lodash
import Features from "./Features";
import Benefits from "./Benefits";
import MainContent from "./MainContent";
import ActionSection from "./ActionSection";
import Header from "./Header";


const HomeSection = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-indigo-900 text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-12">
        <MainContent />
        <Features />
        <Benefits />
        <ActionSection />
      </main>

    </div>
  );
};

export default HomeSection;
