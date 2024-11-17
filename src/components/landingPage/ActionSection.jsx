import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ActionSection = () => {
  return (
    <div className="text-center pb-24 py-3">
      <h3 className="text-4xl font-extrabold mb-8 py-1">
        Ready to Transform Your Exam Management?
      </h3>
      <Link href="/login">
        <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-10 py-4 rounded-full text-xl font-semibold hover:scale-110 transition transform hover:shadow-lg animate-pulse inline-flex items-center">
          Get Started Now
          <ArrowRight className="ml-2" />
        </span>
      </Link>
    </div>
  );
};

export default ActionSection;