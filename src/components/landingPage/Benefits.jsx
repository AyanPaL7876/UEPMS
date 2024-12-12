"use client";
import React from 'react'
import {
  FaFileAlt,
  FaClock,
  FaAward,
} from "react-icons/fa";
function Benefits() {
  return (
    <section id="benefits" className="my-20 relative overflow-hidden pb-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-800 transform -skew-y-6 z-0 animate-pulse"></div>
          <div className="relative z-10 py-16">
            <h2 className="text-4xl font-extrabold mb-12 text-center py-1">
              Why UEPMS?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 py-5 px-8">
              <BenefitCard
                icon={<FaFileAlt size={32} />}
                title="Extensive Question Repository"
                description="Access a diverse range of high-quality questions across subjects and difficulty levels."
              />
              <BenefitCard
                icon={<FaClock size={32} />}
                title="PDF Generation in Seconds"
                description="Generate exam papers in PDF format instantly, saving hours of manual work."
              />
              <BenefitCard
                icon={<FaAward size={32} />}
                title="Quality Assurance"
                description="Ensure error-free question papers with automated plagiarism checks and question validation."
              />
            </div>
          </div>
        </section>
  )
}

const BenefitCard = ({ icon, title, description }) => (
    <div className="bg-[#f1f1f13d] rounded-lg p-6 text-center shadow-md flex justify-center items-center flex-col transition duration-300 hover:scale-105">
    <div className="text-green-500 mb-4 hadow-md">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
  );


export default Benefits