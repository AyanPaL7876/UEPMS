import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MainContent = () => {
  return (
    <div className="text-center h-screen flex flex-col justify-center items-center space-y-6">
      <h1 className="text-6xl font-extrabold mb-4 animate-fadeInDown relative py-3">
        Revolutionize Your Exam Management
      </h1>
      <p className="text-2xl font-light max-w-2xl mx-auto opacity-90 animate-fadeInUp">
        Empower educators, streamline administration, and elevate the exam creation process with our cutting-edge Question Paper Management System.
      </p>
      <Link href="/login" className="px-5 py-2">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:scale-110 transition transform hover:shadow-xl animate-pulse inline-flex items-center">
          Go to Dashboard
          <ArrowRight className="ml-3" />
        </span>
      </Link>
    </div>
  );
};

export default MainContent;