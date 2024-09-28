import React from "react";
import Link from "next/link";
import { FaUsers, FaShieldAlt, FaArrowRight, FaFileAlt, FaClock, FaAward, FaUsersCog } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in py-5">
            University Exam Question Paper Management System
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Streamline your exam preparation process with our comprehensive
            management system. Empower educators and simplify administration.
          </p>
          <Link href="/login">
            <span className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
              Get Started
              <FaArrowRight className="ml-2" />
            </span>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<FaUsersCog size={40} />}
            title="Role-Based Access Control"
            description="Secure system with customized access for Admin, COE, HOD, and Teachers."
          />
          <FeatureCard
            icon={<FaUsers size={40} />}
            title="Collaborative Editing"
            description="Allow multiple teachers to collaborate on creating and editing question papers in real-time."
          />
          <FeatureCard
            icon={<FaShieldAlt size={40} />}
            title="Secure Storage"
            description="Safely store all your question papers with encrypted cloud storage and role-based access control."
          />
        </section>

        <section className="bg-gray-800 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<FaFileAlt size={32} />}
              title="Comprehensive Question Bank"
              description="Access a vast repository of curated questions across various subjects and difficulty levels."
            />
            <BenefitCard
              icon={<FaClock size={32} />}
              title="Time-Saving Tools"
              description="Utilize our intelligent question selection and paper generation features to create exams quickly."
            />
            <BenefitCard
              icon={<FaAward size={32} />}
              title="Quality Assurance"
              description="Ensure high-quality exam papers with our built-in review and validation processes."
            />
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Exam Management?</h3>
          <Link href="/login">
            <span className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
              Log In to Your Account
              <FaArrowRight className="ml-2" />
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const BenefitCard = ({ icon, title, description }) => (
  <div className="flex items-start">
    <div className="text-green-500 mr-4 mt-1 w-20">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);