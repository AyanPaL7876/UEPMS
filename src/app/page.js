"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUsers,
  FaShieldAlt,
  FaArrowRight,
  FaFileAlt,
  FaClock,
  FaAward,
  FaUsersCog,
  FaGraduationCap,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Add state for mobile menu
  console.log(scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-gray-100">
      {/* Header */}
      <header
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
                QuestionMaster
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#benefits">Benefits</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
            <div className="hidden md:flex space-x-4">
              <ActionButton
                href="/login"
                bgColor="bg-blue-600"
                hoverColor="hover:bg-blue-700"
              >
                Log In
              </ActionButton>
              {/* <ActionButton
                href="/signup"
                bgColor="bg-green-600"
                hoverColor="hover:bg-green-700"
              >
                Sign Up
              </ActionButton> */}
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
                {/* <ActionButton
                  href="/signup"
                  bgColor="bg-green-600"
                  hoverColor="hover:bg-green-700"
                  fullWidth
                >
                  Sign Up
                </ActionButton> */}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-12">
        {/* Hero Section */}
        <section className="text-center h-screen flex flex-col justify-center items-center space-y-6">
          <h1 className="text-6xl font-extrabold mb-4 animate-fadeInDown relative py-3">
            Revolutionize Your Exam Management
          </h1>
          <p className="text-2xl font-light max-w-2xl mx-auto opacity-90 animate-fadeInUp">
            Empower educators, streamline administration, and elevate the exam
            creation process with our cutting-edge Question Paper Management
            System.
          </p>
          <Link href="/demo">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:scale-110 transition transform hover:shadow-xl animate-pulse inline-flex items-center">
              Experience the Demo
              <FaArrowRight className="ml-3" />
            </span>
          </Link>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-indigo-900 to-transparent"></div>
        </section>

        {/* Features Section */}
        <section className="my-24">
          <h2 className="text-4xl font-extrabold mb-12 text-center py-1">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 py-5 px-8">
            <FeatureCard
              icon={<FaUsersCog size={40} />}
              title="Intelligent Access Control"
              description="Tailor-made access for Admin, COE, HOD, and Teachers, ensuring data integrity and security."
            />
            <FeatureCard
              icon={<FaUsers size={40} />}
              title="Real-time Collaboration"
              description="Seamlessly work together on question papers with live editing and commenting features."
            />
            <FeatureCard
              icon={<FaShieldAlt size={40} />}
              title="Fortress-level Security"
              description="Bank-grade encryption and role-based access control to protect your sensitive exam data."
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="my-20 relative overflow-hidden pb-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-800 transform -skew-y-6 z-0 animate-pulse"></div>
          <div className="relative z-10 py-16">
            <h2 className="text-4xl font-extrabold mb-12 text-center py-1">
              Why ExamPro?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 py-5 px-8">
              <BenefitCard
                icon={<FaFileAlt size={32} />}
                title="Extensive Question Repository"
                description="Access a diverse range of high-quality questions across subjects and difficulty levels."
              />
              <BenefitCard
                icon={<FaClock size={32} />}
                title="AI-Powered Efficiency"
                description="Leverage machine learning for smart question selection and rapid paper generation."
              />
              <BenefitCard
                icon={<FaAward size={32} />}
                title="Rigorous Quality Assurance"
                description="Implement rigorous review processes to ensure consistently high-quality exam papers."
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center mb-24 py-3">
          <h3 className="text-4xl font-extrabold mb-8 py-1">
            Ready to Transform Your Exam Management?
          </h3>
          <Link href="/signup">
            <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-10 py-4 rounded-full text-xl font-semibold hover:scale-110 transition transform hover:shadow-lg animate-pulse inline-flex items-center">
              Get Started Now
              <FaArrowRight className="ml-2" />
            </span>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-1 text-center">
          <p>&copy; 2024 QuestionMaster. All rights reserved.</p>
        </div>
      </footer>
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


// FeatureCard Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#f1f1f11c] rounded-lg p-6 text-center shadow-md flex justify-center items-center flex-col transition duration-300 hover:scale-105 ">
      <div className="text-blue-500 mb-4 hadow-md">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
  </div>
);

// BenefitCard Component
const BenefitCard = ({ icon, title, description }) => (
  <div className="bg-[#f1f1f13d] rounded-lg p-6 text-center shadow-md flex justify-center items-center flex-col transition duration-300 hover:scale-105">
  <div className="text-green-500 mb-4 hadow-md">{icon}</div>
  <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
  <p className="text-gray-300">{description}</p>
</div>
);

export default Home;
